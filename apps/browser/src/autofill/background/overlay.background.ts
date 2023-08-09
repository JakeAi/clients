import { SettingsService } from "@bitwarden/common/abstractions/settings.service";
import { AuthService } from "@bitwarden/common/auth/abstractions/auth.service";
import { AuthenticationStatus } from "@bitwarden/common/auth/enums/authentication-status";
import { EnvironmentService } from "@bitwarden/common/platform/abstractions/environment.service";
import { StateService } from "@bitwarden/common/platform/abstractions/state.service";
import { Utils } from "@bitwarden/common/platform/misc/utils";
import { WebsiteIconService } from "@bitwarden/common/services/website-icon.service";
import { CipherService } from "@bitwarden/common/vault/abstractions/cipher.service";
import { CipherType } from "@bitwarden/common/vault/enums/cipher-type";
import { CipherView } from "@bitwarden/common/vault/models/view/cipher.view";
import { LoginUriView } from "@bitwarden/common/vault/models/view/login-uri.view";
import { LoginView } from "@bitwarden/common/vault/models/view/login.view";

import LockedVaultPendingNotificationsItem from "../../background/models/lockedVaultPendingNotificationsItem";
import { BrowserApi } from "../../platform/browser/browser-api";
import AutofillOverlayPort from "../overlay/utils/port-identifiers.enum";
import { AutofillService, PageDetail } from "../services/abstractions/autofill.service";

import {
  OverlayBackgroundExtensionMessageHandlers,
  OverlayIconPortMessageHandlers,
  OverlayListPortMessageHandlers,
} from "./abstractions/overlay.background";

class OverlayBackground {
  private ciphers: any[] = [];
  private currentContextualCiphers: any[] = [];
  private iconsServerUrl: string;
  private pageDetailsToAutoFill: Map<number, PageDetail[]> = new Map();
  private overlayListSenderInfo: chrome.runtime.MessageSender;
  private userAuthStatus: AuthenticationStatus = AuthenticationStatus.LoggedOut;
  private overlayIconPort: chrome.runtime.Port;
  private overlayListPort: chrome.runtime.Port;
  private readonly extensionMessageHandlers: OverlayBackgroundExtensionMessageHandlers = {
    bgOpenAutofillOverlayList: () => this.openAutofillOverlayList(),
    bgCheckOverlayFocused: () => this.checkOverlayFocused(),
    bgCheckAuthStatus: async () => await this.getAuthStatus(),
    bgAutofillOverlayIconClosed: () => this.overlayIconClosed(),
    bgAutofillOverlayListClosed: () => this.overlayListClosed(),
    bgAddNewVaultItem: ({ message, sender }) => this.addNewVaultItem(message, sender),
    collectPageDetailsResponse: ({ message, sender }) =>
      this.collectPageDetailsResponse(message, sender),
    unlockCompleted: ({ sender }) => this.handleUnlockedCompleted(sender),
    addEditCipherSubmitted: () => this.updateCurrentContextualCiphers(),
    deletedCipher: () => this.updateCurrentContextualCiphers(),
  };
  private readonly overlayIconPortMessageHandlers: OverlayIconPortMessageHandlers = {
    overlayIconClicked: ({ port }) => this.handleOverlayIconClicked(port.sender),
    closeAutofillOverlay: ({ port }) => this.closeAutofillOverlay(port.sender),
    overlayIconBlurred: () => this.checkOverlayListFocused(),
  };
  private readonly overlayListPortMessageHandlers: OverlayListPortMessageHandlers = {
    checkOverlayIconFocused: () => this.checkOverlayIconFocused(),
    unlockVault: ({ port }) => this.unlockVault(port.sender),
    autofillSelectedListItem: ({ message, port }) =>
      this.autofillOverlayListItem(message, port.sender),
    updateAutofillOverlayListHeight: ({ message }) => this.updateAutofillOverlayListHeight(message),
    addNewVaultItem: () => this.getNewVaultItemDetails(),
  };

  constructor(
    private cipherService: CipherService,
    private autofillService: AutofillService,
    private authService: AuthService,
    private environmentService: EnvironmentService,
    private settingsService: SettingsService,
    private stateService: StateService
  ) {
    this.iconsServerUrl = this.environmentService.getIconsUrl();
    this.getAuthStatus();
    this.setupExtensionMessageListeners();

    // TODO: Need to think of a more effective way to handle this. This is a temporary solution.
    chrome.tabs.onRemoved.addListener((tabId) => this.removePageDetails(tabId));
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (changeInfo.status !== "complete") {
        this.removePageDetails(tabId);
      }
    });
  }

  private collectPageDetailsResponse(message: any, sender: chrome.runtime.MessageSender) {
    // TODO: Need to think of a more effective way to handle this. This is a temporary solution.
    const pageDetails = this.pageDetailsToAutoFill.get(sender.tab.id) || [];
    pageDetails.push({
      frameId: sender.frameId,
      tab: sender.tab,
      details: message.details,
    });

    this.pageDetailsToAutoFill.set(sender.tab.id, pageDetails);
  }

  private removePageDetails(tabId: number) {
    this.pageDetailsToAutoFill.delete(tabId);
  }

  private autofillOverlayListItem(message: any, sender: chrome.runtime.MessageSender) {
    if (!message.cipherId) {
      return;
    }

    const cipher = this.ciphers.find((c) => c.id === message.cipherId);

    // TODO: There has to be a better, less costly way to do this...
    const cipherIndex = this.currentContextualCiphers.findIndex((c) => c.id === message.cipherId);
    this.currentContextualCiphers.unshift(this.currentContextualCiphers.splice(cipherIndex, 1)[0]);

    this.autofillService.doAutoFill({
      tab: sender.tab,
      cipher: cipher,
      pageDetails: this.pageDetailsToAutoFill.get(sender.tab.id),
      fillNewPassword: true,
      allowTotpAutofill: true,
    });
  }

  private checkOverlayFocused() {
    if (this.overlayListPort) {
      this.checkOverlayListFocused();

      return;
    }

    this.checkOverlayIconFocused();
  }

  private checkOverlayIconFocused() {
    if (!this.overlayIconPort) {
      return;
    }

    this.overlayIconPort.postMessage({ command: "checkOverlayIconFocused" });
  }

  private checkOverlayListFocused() {
    if (!this.overlayListPort) {
      return;
    }

    this.overlayListPort.postMessage({ command: "checkOverlayListFocused" });
  }

  private closeAutofillOverlay(sender: chrome.runtime.MessageSender) {
    if (!sender) {
      return;
    }

    chrome.tabs.sendMessage(sender.tab.id, { command: "closeAutofillOverlay" });
  }

  private overlayIconClosed() {
    this.overlayIconPort = null;
  }

  private overlayListClosed() {
    this.overlayListPort = null;
  }

  private async openAutofillOverlayList(focusFieldElement = false) {
    // TODO: Likely this won't work effectively, we need to consider how to handle iframed forms
    const currentTab = await BrowserApi.getTabFromCurrentWindowId();
    const authStatus = await this.getAuthStatus();
    chrome.tabs.sendMessage(currentTab.id, {
      command: "openAutofillOverlayList",
      authStatus,
      focusFieldElement,
    });
  }

  private async handleUnlockedCompleted(sender: chrome.runtime.MessageSender) {
    await BrowserApi.tabSendMessageData(sender.tab, "closeNotificationBar");
    this.openAutofillOverlayList(true);
  }

  async updateCurrentContextualCiphers() {
    if (this.userAuthStatus !== AuthenticationStatus.Unlocked) {
      return;
    }

    // TODO: Likely this won't work effectively, we need to consider how to handle iframed forms
    const currentTab = await BrowserApi.getTabFromCurrentWindowId();
    const unsortedCiphers = await this.cipherService.getAllDecryptedForUrl(currentTab.url);
    this.ciphers = unsortedCiphers.sort((a, b) =>
      this.cipherService.sortCiphersByLastUsedThenName(a, b)
    );
    const isFaviconDisabled = this.settingsService.getDisableFavicon();

    this.currentContextualCiphers = this.ciphers.map((cipher) => ({
      id: cipher.id,
      name: cipher.name,
      type: cipher.type,
      reprompt: cipher.reprompt,
      favorite: cipher.favorite,
      // TODO: Consider a better way to approach this. Each login cipher type will have the same icon.
      icon: !isFaviconDisabled
        ? WebsiteIconService.buildCipherIconData(this.iconsServerUrl, cipher, isFaviconDisabled)
        : null,
      login: {
        username: cipher.login.username,
      },
      card: {
        cardholderName: cipher.card.cardholderName,
        partialNumber: cipher.card.number?.slice(-4),
        expMonth: cipher.card.expMonth,
        expYear: cipher.card.expYear,
      },
      identity: {
        title: cipher.identity.title,
        firstName: cipher.identity.firstName,
        middleName: cipher.identity.middleName,
        lastName: cipher.identity.lastName,
        email: cipher.identity.email,
        company: cipher.identity.company,
      },
    }));

    if (this.overlayListPort) {
      this.overlayListPort.postMessage({
        command: "updateContextualCiphers",
        ciphers: this.currentContextualCiphers,
      });
    }
  }

  private updateAutofillOverlayListHeight(message: any) {
    if (!this.overlayListSenderInfo) {
      return;
    }

    chrome.tabs.sendMessage(this.overlayListSenderInfo.tab.id, {
      command: "updateAutofillOverlayListHeight",
      height: message.height,
    });
  }

  private async getAuthStatus() {
    const authStatus = await this.authService.getAuthStatus();
    if (authStatus !== this.userAuthStatus && authStatus === AuthenticationStatus.Unlocked) {
      this.userAuthStatus = authStatus;
      this.updateAutofillOverlayIconAuthStatus();
      await this.updateCurrentContextualCiphers();
    }

    this.userAuthStatus = authStatus;
    return this.userAuthStatus;
  }

  private updateAutofillOverlayIconAuthStatus() {
    if (!this.overlayIconPort) {
      return;
    }

    this.overlayIconPort.postMessage({
      command: "updateAuthStatus",
      authStatus: this.userAuthStatus,
    });
  }

  private handleOverlayIconClicked(sender: chrome.runtime.MessageSender) {
    if (this.userAuthStatus !== AuthenticationStatus.Unlocked) {
      this.unlockVault(sender);
      return;
    }

    this.openAutofillOverlayList();
  }

  private async unlockVault(sender?: chrome.runtime.MessageSender) {
    if (!sender) {
      return;
    }

    this.closeAutofillOverlay(sender);
    const retryMessage: LockedVaultPendingNotificationsItem = {
      commandToRetry: {
        msg: {
          command: "bgOpenAutofillOverlayList",
        },
        sender: sender,
      },
      target: "overlay.background",
    };
    await BrowserApi.tabSendMessageData(
      sender.tab,
      "addToLockedVaultPendingNotifications",
      retryMessage
    );
    await BrowserApi.tabSendMessageData(sender.tab, "promptForLogin");
  }

  private setupExtensionMessageListeners() {
    chrome.runtime.onMessage.addListener(this.handleExtensionMessage);
    chrome.runtime.onConnect.addListener(this.handlePortOnConnect);
  }

  private handleExtensionMessage = (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    const command: string = message.command;
    const handler: CallableFunction | undefined = this.extensionMessageHandlers[command];
    if (!handler) {
      return false;
    }

    const messageResponse = handler({ message, sender });
    if (!messageResponse) {
      return false;
    }

    Promise.resolve(messageResponse).then((response) => sendResponse(response));
    return true;
  };

  private handlePortOnConnect = (port: chrome.runtime.Port) => {
    if (port.name === AutofillOverlayPort.Icon) {
      this.setupOverlayIconPort(port);
    }

    if (port.name === AutofillOverlayPort.List) {
      this.setupOverlayListPort(port);
    }
  };

  private setupOverlayIconPort = async (port: chrome.runtime.Port) => {
    this.overlayIconPort = port;
    this.overlayIconPort.postMessage({
      command: "initAutofillOverlayIcon",
      authStatus: this.userAuthStatus || (await this.getAuthStatus()),
      styleSheetUrl: chrome.runtime.getURL("overlay/icon.css"),
    });
    this.overlayIconPort.onMessage.addListener(this.handleOverlayIconPortMessage);
  };

  private handleOverlayIconPortMessage = (message: any, port: chrome.runtime.Port) => {
    if (port.name !== AutofillOverlayPort.Icon) {
      return;
    }

    const handler = this.overlayIconPortMessageHandlers[message?.command];
    if (!handler) {
      return;
    }

    handler({ message, port });
  };

  private setupOverlayListPort = async (port: chrome.runtime.Port) => {
    if (port.sender) {
      this.overlayListSenderInfo = port.sender;
    }

    this.overlayListPort = port;
    this.overlayListPort.postMessage({
      command: "initAutofillOverlayList",
      authStatus: this.userAuthStatus || (await this.getAuthStatus()),
      ciphers: this.currentContextualCiphers,
      styleSheetUrl: chrome.runtime.getURL("overlay/list.css"),
    });
    this.overlayListPort.onMessage.addListener(this.handleOverlayListPortMessage);
  };

  private handleOverlayListPortMessage = (message: any, port: chrome.runtime.Port) => {
    if (port.name !== AutofillOverlayPort.List) {
      return;
    }

    const handler = this.overlayListPortMessageHandlers[message?.command];
    if (!handler) {
      return;
    }

    handler({ message, port });
  };

  // TODO: Need to go through and refactor this implementation to be more robust.
  private getNewVaultItemDetails() {
    chrome.tabs.sendMessage(this.overlayListSenderInfo.tab.id, {
      command: "addNewVaultItemFromOverlay",
    });
  }

  private async addNewVaultItem(message: any, sender: chrome.runtime.MessageSender) {
    // TODO: This is an exact implementation of AddLoginQueueMessage.toCipherView. Need to find a way to abstract this logic.
    const uriView = new LoginUriView();
    uriView.uri = message.login.uri;

    const loginView = new LoginView();
    loginView.uris = [uriView];
    loginView.username = message.login.username || "";
    loginView.password = message.login.password || "";

    const cipherView = new CipherView();
    cipherView.name = (Utils.getHostname(message.login.uri) || message.login.hostname).replace(
      /^www\./,
      ""
    );
    cipherView.folderId = null;
    cipherView.type = CipherType.Login;
    cipherView.login = loginView;

    await this.stateService.setAddEditCipherInfo({
      cipher: cipherView,
      collectionIds: cipherView.collectionIds,
    });

    await BrowserApi.tabSendMessageData(sender.tab, "openAddEditCipher", {
      cipherId: cipherView.id,
    });
  }
}

export default OverlayBackground;
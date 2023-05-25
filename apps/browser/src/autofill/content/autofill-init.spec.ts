import { mock } from "jest-mock-extended";

import { AutofillExtensionMessage } from "../models/autofill-init";
import AutofillPageDetails from "../models/autofill-page-details";

describe("AutofillInit", function () {
  let bitwardenAutofillInit: any;

  beforeEach(function () {
    jest.resetModules();
    jest.clearAllMocks();
    require("../content/autofill-init");
    bitwardenAutofillInit = window.bitwardenAutofillInit;
  });

  describe("init", function () {
    it("sets up the extension message listeners", function () {
      jest.spyOn(bitwardenAutofillInit, "setupExtensionMessageListeners");

      bitwardenAutofillInit.init();

      expect(bitwardenAutofillInit.setupExtensionMessageListeners).toHaveBeenCalled();
    });
  });

  describe("collectPageDetails", function () {
    let extensionMessage: AutofillExtensionMessage;
    let pageDetails: AutofillPageDetails;

    beforeEach(function () {
      extensionMessage = {
        command: "collectPageDetails",
        tab: mock<chrome.tabs.Tab>(),
        sender: "sender",
      };
      pageDetails = {
        documentUUID: "documentUuid",
        title: "title",
        url: "http://example.com",
        documentUrl: "documentUrl",
        forms: {},
        fields: [],
        collectedTimestamp: 0,
      };
      jest
        .spyOn(bitwardenAutofillInit.autofillCollect, "getPageDetails")
        .mockReturnValue(pageDetails);
    });

    it("returns collected page details for autofill if set to send the details in the response", function () {
      const response = bitwardenAutofillInit["collectPageDetails"](extensionMessage, true);

      expect(bitwardenAutofillInit.autofillCollect.getPageDetails).toHaveBeenCalled();
      expect(response).toEqual(pageDetails);
    });

    it("sends the collected page details for autofill using a background script message", function () {
      jest.spyOn(chrome.runtime, "sendMessage");

      bitwardenAutofillInit["collectPageDetails"](extensionMessage);

      expect(chrome.runtime.sendMessage).toHaveBeenCalledWith({
        command: "collectPageDetailsResponse",
        tab: extensionMessage.tab,
        details: pageDetails,
        sender: extensionMessage.sender,
      });
    });
  });

  describe("setupExtensionMessageListeners", function () {
    it("sets up a chrome runtime on message listener", function () {
      jest.spyOn(chrome.runtime.onMessage, "addListener");

      bitwardenAutofillInit["setupExtensionMessageListeners"]();

      expect(chrome.runtime.onMessage.addListener).toHaveBeenCalledWith(
        bitwardenAutofillInit["handleExtensionMessage"]
      );
    });
  });

  describe("handleExtensionMessage", function () {
    let message: AutofillExtensionMessage;
    let sender: chrome.runtime.MessageSender;
    const sendResponse = jest.fn();

    beforeEach(function () {
      message = {
        command: "collectPageDetails",
        tab: mock<chrome.tabs.Tab>(),
        sender: "sender",
      };
      sender = mock<chrome.runtime.MessageSender>();
    });

    it("returns a false value if a extension message handler is not found with the given message command", function () {
      message.command = "unknownCommand";

      const response = bitwardenAutofillInit["handleExtensionMessage"](
        message,
        sender,
        sendResponse
      );

      expect(response).toBe(false);
    });

    it("returns a false value if the message handler does not return a response", function () {
      const response = bitwardenAutofillInit["handleExtensionMessage"](
        message,
        sender,
        sendResponse
      );

      expect(response).toBe(false);
    });

    it("returns a true value and calls sendResponse if the message handler returns a response", async function () {
      message.command = "collectPageDetailsImmediately";
      const pageDetails: AutofillPageDetails = {
        documentUUID: "documentUuid",
        title: "title",
        url: "http://example.com",
        documentUrl: "documentUrl",
        forms: {},
        fields: [],
        collectedTimestamp: 0,
      };
      jest
        .spyOn(bitwardenAutofillInit.autofillCollect, "getPageDetails")
        .mockReturnValue(pageDetails);

      const response = await bitwardenAutofillInit["handleExtensionMessage"](
        message,
        sender,
        sendResponse
      );

      expect(response).toBe(true);
      expect(sendResponse).toHaveBeenCalledWith(pageDetails);
    });
  });
});

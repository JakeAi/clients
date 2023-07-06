import { mock, mockReset } from "jest-mock-extended";

import { DevicesApiServiceAbstraction } from "../../abstractions/devices/devices-api.service.abstraction";
import { DeviceResponse } from "../../abstractions/devices/responses/device.response";
import { EncryptionType } from "../../enums/encryption-type.enum";
import { AppIdService } from "../../platform/abstractions/app-id.service";
import { CryptoFunctionService } from "../../platform/abstractions/crypto-function.service";
import { EncryptService } from "../../platform/abstractions/encrypt.service";
import { StateService } from "../../platform/abstractions/state.service";
import { EncString } from "../../platform/models/domain/enc-string";
import {
  SymmetricCryptoKey,
  DeviceKey,
  UserKey,
} from "../../platform/models/domain/symmetric-crypto-key";
import { CryptoService } from "../../platform/services/crypto.service";
import { CsprngArray } from "../../types/csprng";

import { DeviceTrustCryptoService } from "./device-trust-crypto.service.implementation";

describe("deviceTrustCryptoService", () => {
  let deviceTrustCryptoService: DeviceTrustCryptoService;

  const cryptoFunctionService = mock<CryptoFunctionService>();
  const cryptoService = mock<CryptoService>();
  const encryptService = mock<EncryptService>();
  const stateService = mock<StateService>();
  const appIdService = mock<AppIdService>();
  const devicesApiService = mock<DevicesApiServiceAbstraction>();

  beforeEach(() => {
    mockReset(cryptoFunctionService);
    mockReset(encryptService);
    mockReset(stateService);
    mockReset(appIdService);
    mockReset(devicesApiService);

    deviceTrustCryptoService = new DeviceTrustCryptoService(
      cryptoFunctionService,
      cryptoService,
      encryptService,
      stateService,
      appIdService,
      devicesApiService
    );
  });

  it("instantiates", () => {
    expect(deviceTrustCryptoService).not.toBeFalsy();
  });

  describe("User Trust Device Choice For Decryption", () => {
    describe("getUserTrustDeviceChoiceForDecryption", () => {
      it("gets the user trust device choice for decryption from the state service", async () => {
        const stateSvcGetUserTrustDeviceChoiceForDecryptionSpy = jest.spyOn(
          stateService,
          "getUserTrustDeviceChoiceForDecryption"
        );

        const expectedValue = true;
        stateSvcGetUserTrustDeviceChoiceForDecryptionSpy.mockResolvedValue(expectedValue);
        const result = await deviceTrustCryptoService.getUserTrustDeviceChoiceForDecryption();

        expect(stateSvcGetUserTrustDeviceChoiceForDecryptionSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(expectedValue);
      });
    });

    describe("setUserTrustDeviceChoiceForDecryption", () => {
      it("sets the user trust device choice for decryption in the state service", async () => {
        const stateSvcSetUserTrustDeviceChoiceForDecryptionSpy = jest.spyOn(
          stateService,
          "setUserTrustDeviceChoiceForDecryption"
        );

        const newValue = true;
        await deviceTrustCryptoService.setUserTrustDeviceChoiceForDecryption(newValue);

        expect(stateSvcSetUserTrustDeviceChoiceForDecryptionSpy).toHaveBeenCalledTimes(1);
        expect(stateSvcSetUserTrustDeviceChoiceForDecryptionSpy).toHaveBeenCalledWith(newValue);
      });
    });
  });

  describe("Trusted Device Encryption core logic tests", () => {
    const deviceKeyBytesLength = 64;
    const userKeyBytesLength = 64;

    describe("getDeviceKey", () => {
      let existingDeviceKey: DeviceKey;
      let stateSvcGetDeviceKeySpy: jest.SpyInstance;

      beforeEach(() => {
        existingDeviceKey = new SymmetricCryptoKey(
          new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray
        ) as DeviceKey;

        stateSvcGetDeviceKeySpy = jest.spyOn(stateService, "getDeviceKey");
      });

      it("returns null when there is not an existing device key", async () => {
        stateSvcGetDeviceKeySpy.mockResolvedValue(null);

        const deviceKey = await deviceTrustCryptoService.getDeviceKey();

        expect(stateSvcGetDeviceKeySpy).toHaveBeenCalledTimes(1);

        expect(deviceKey).toBeNull();
      });

      it("returns the device key when there is an existing device key", async () => {
        stateSvcGetDeviceKeySpy.mockResolvedValue(existingDeviceKey);

        const deviceKey = await deviceTrustCryptoService.getDeviceKey();

        expect(stateSvcGetDeviceKeySpy).toHaveBeenCalledTimes(1);

        expect(deviceKey).not.toBeNull();
        expect(deviceKey).toBeInstanceOf(SymmetricCryptoKey);
        expect(deviceKey).toEqual(existingDeviceKey);
      });
    });

    describe("setDeviceKey", () => {
      it("sets the device key in the state service", async () => {
        const stateSvcSetDeviceKeySpy = jest.spyOn(stateService, "setDeviceKey");

        const deviceKey = new SymmetricCryptoKey(
          new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray
        ) as DeviceKey;

        // TypeScript will allow calling private methods if the object is of type 'any'
        // This is a hacky workaround, but it allows for cleaner tests
        await (deviceTrustCryptoService as any).setDeviceKey(deviceKey);

        expect(stateSvcSetDeviceKeySpy).toHaveBeenCalledTimes(1);
        expect(stateSvcSetDeviceKeySpy).toHaveBeenCalledWith(deviceKey);
      });
    });

    describe("makeDeviceKey", () => {
      it("creates a new non-null 64 byte device key, securely stores it, and returns it", async () => {
        const mockRandomBytes = new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray;

        const cryptoFuncSvcRandomBytesSpy = jest
          .spyOn(cryptoFunctionService, "randomBytes")
          .mockResolvedValue(mockRandomBytes);

        // TypeScript will allow calling private methods if the object is of type 'any'
        // This is a hacky workaround, but it allows for cleaner tests
        const deviceKey = await (deviceTrustCryptoService as any).makeDeviceKey();

        expect(cryptoFuncSvcRandomBytesSpy).toHaveBeenCalledTimes(1);
        expect(cryptoFuncSvcRandomBytesSpy).toHaveBeenCalledWith(deviceKeyBytesLength);

        expect(deviceKey).not.toBeNull();
        expect(deviceKey).toBeInstanceOf(SymmetricCryptoKey);
      });
    });

    describe("trustDevice", () => {
      let mockDeviceKeyRandomBytes: CsprngArray;
      let mockDeviceKey: DeviceKey;

      let mockUserKeyRandomBytes: CsprngArray;
      let mockUserKey: UserKey;

      const deviceRsaKeyLength = 2048;
      let mockDeviceRsaKeyPair: [ArrayBuffer, ArrayBuffer];
      let mockDevicePrivateKey: ArrayBuffer;
      let mockDevicePublicKey: ArrayBuffer;
      let mockDevicePublicKeyEncryptedUserKey: EncString;
      let mockUserKeyEncryptedDevicePublicKey: EncString;
      let mockDeviceKeyEncryptedDevicePrivateKey: EncString;

      const mockDeviceResponse: DeviceResponse = new DeviceResponse({
        Id: "mockId",
        Name: "mockName",
        Identifier: "mockIdentifier",
        Type: "mockType",
        CreationDate: "mockCreationDate",
      });

      const mockDeviceId = "mockDeviceId";

      let makeDeviceKeySpy: jest.SpyInstance;
      let rsaGenerateKeyPairSpy: jest.SpyInstance;
      let cryptoSvcGetUserKeyFromMemorySpy: jest.SpyInstance;
      let cryptoSvcRsaEncryptSpy: jest.SpyInstance;
      let encryptServiceEncryptSpy: jest.SpyInstance;
      let appIdServiceGetAppIdSpy: jest.SpyInstance;
      let devicesApiServiceUpdateTrustedDeviceKeysSpy: jest.SpyInstance;

      beforeEach(() => {
        // Setup all spies and default return values for the happy path

        mockDeviceKeyRandomBytes = new Uint8Array(deviceKeyBytesLength).buffer as CsprngArray;
        mockDeviceKey = new SymmetricCryptoKey(mockDeviceKeyRandomBytes) as DeviceKey;

        mockUserKeyRandomBytes = new Uint8Array(userKeyBytesLength).buffer as CsprngArray;
        mockUserKey = new SymmetricCryptoKey(mockUserKeyRandomBytes) as UserKey;

        mockDeviceRsaKeyPair = [
          new ArrayBuffer(deviceRsaKeyLength),
          new ArrayBuffer(deviceRsaKeyLength),
        ];

        mockDevicePublicKey = mockDeviceRsaKeyPair[0];
        mockDevicePrivateKey = mockDeviceRsaKeyPair[1];

        mockDevicePublicKeyEncryptedUserKey = new EncString(
          EncryptionType.Rsa2048_OaepSha1_B64,
          "mockDevicePublicKeyEncryptedUserKey"
        );

        mockUserKeyEncryptedDevicePublicKey = new EncString(
          EncryptionType.AesCbc256_HmacSha256_B64,
          "mockUserKeyEncryptedDevicePublicKey"
        );

        mockDeviceKeyEncryptedDevicePrivateKey = new EncString(
          EncryptionType.AesCbc256_HmacSha256_B64,
          "mockDeviceKeyEncryptedDevicePrivateKey"
        );

        // TypeScript will allow calling private methods if the object is of type 'any'
        makeDeviceKeySpy = jest
          .spyOn(deviceTrustCryptoService as any, "makeDeviceKey")
          .mockResolvedValue(mockDeviceKey);

        rsaGenerateKeyPairSpy = jest
          .spyOn(cryptoFunctionService, "rsaGenerateKeyPair")
          .mockResolvedValue(mockDeviceRsaKeyPair);

        cryptoSvcGetUserKeyFromMemorySpy = jest
          .spyOn(cryptoService, "getUserKeyFromMemory")
          .mockResolvedValue(mockUserKey);

        cryptoSvcRsaEncryptSpy = jest
          .spyOn(cryptoService, "rsaEncrypt")
          .mockResolvedValue(mockDevicePublicKeyEncryptedUserKey);

        encryptServiceEncryptSpy = jest
          .spyOn(encryptService, "encrypt")
          .mockImplementation((plainValue, key) => {
            if (plainValue === mockDevicePublicKey && key === mockUserKey) {
              return Promise.resolve(mockUserKeyEncryptedDevicePublicKey);
            }
            if (plainValue === mockDevicePrivateKey && key === mockDeviceKey) {
              return Promise.resolve(mockDeviceKeyEncryptedDevicePrivateKey);
            }
          });

        appIdServiceGetAppIdSpy = jest
          .spyOn(appIdService, "getAppId")
          .mockResolvedValue(mockDeviceId);

        devicesApiServiceUpdateTrustedDeviceKeysSpy = jest
          .spyOn(devicesApiService, "updateTrustedDeviceKeys")
          .mockResolvedValue(mockDeviceResponse);
      });

      it("calls the required methods with the correct arguments and returns a DeviceResponse", async () => {
        const response = await deviceTrustCryptoService.trustDevice();

        expect(makeDeviceKeySpy).toHaveBeenCalledTimes(1);
        expect(rsaGenerateKeyPairSpy).toHaveBeenCalledTimes(1);
        expect(cryptoSvcGetUserKeyFromMemorySpy).toHaveBeenCalledTimes(1);

        expect(cryptoSvcRsaEncryptSpy).toHaveBeenCalledTimes(1);
        expect(encryptServiceEncryptSpy).toHaveBeenCalledTimes(2);

        expect(appIdServiceGetAppIdSpy).toHaveBeenCalledTimes(1);
        expect(devicesApiServiceUpdateTrustedDeviceKeysSpy).toHaveBeenCalledTimes(1);
        expect(devicesApiServiceUpdateTrustedDeviceKeysSpy).toHaveBeenCalledWith(
          mockDeviceId,
          mockDevicePublicKeyEncryptedUserKey.encryptedString,
          mockUserKeyEncryptedDevicePublicKey.encryptedString,
          mockDeviceKeyEncryptedDevicePrivateKey.encryptedString
        );

        expect(response).toBeInstanceOf(DeviceResponse);
        expect(response).toEqual(mockDeviceResponse);
      });

      it("throws specific error if user key is not found", async () => {
        // setup the spy to return null
        cryptoSvcGetUserKeyFromMemorySpy.mockResolvedValue(null);
        // check if the expected error is thrown
        await expect(deviceTrustCryptoService.trustDevice()).rejects.toThrow(
          "User symmetric key not found"
        );

        // reset the spy
        cryptoSvcGetUserKeyFromMemorySpy.mockReset();

        // setup the spy to return undefined
        cryptoSvcGetUserKeyFromMemorySpy.mockResolvedValue(undefined);
        // check if the expected error is thrown
        await expect(deviceTrustCryptoService.trustDevice()).rejects.toThrow(
          "User symmetric key not found"
        );
      });

      const methodsToTestForErrorsOrInvalidReturns = [
        {
          method: "makeDeviceKey",
          spy: () => makeDeviceKeySpy,
          errorText: "makeDeviceKey error",
        },
        {
          method: "rsaGenerateKeyPair",
          spy: () => rsaGenerateKeyPairSpy,
          errorText: "rsaGenerateKeyPair error",
        },
        {
          method: "getUserKeyFromMemory",
          spy: () => cryptoSvcGetUserKeyFromMemorySpy,
          errorText: "getUserKeyFromMemory error",
        },
        {
          method: "rsaEncrypt",
          spy: () => cryptoSvcRsaEncryptSpy,
          errorText: "rsaEncrypt error",
        },
        {
          method: "encryptService.encrypt",
          spy: () => encryptServiceEncryptSpy,
          errorText: "encryptService.encrypt error",
        },
      ];

      describe.each(methodsToTestForErrorsOrInvalidReturns)(
        "trustDevice error handling and invalid return testing",
        ({ method, spy, errorText }) => {
          // ensures that error propagation works correctly
          it(`throws an error if ${method} fails`, async () => {
            const methodSpy = spy();
            methodSpy.mockRejectedValue(new Error(errorText));
            await expect(deviceTrustCryptoService.trustDevice()).rejects.toThrow(errorText);
          });

          test.each([null, undefined])(
            `throws an error if ${method} returns %s`,
            async (invalidValue) => {
              const methodSpy = spy();
              methodSpy.mockResolvedValue(invalidValue);
              await expect(deviceTrustCryptoService.trustDevice()).rejects.toThrow();
            }
          );
        }
      );
    });

    // TOOD Add tests for decryptUserKeyWithDeviceKey when types are available
  });
});
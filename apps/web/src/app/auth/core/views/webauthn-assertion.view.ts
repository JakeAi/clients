import { SymmetricCryptoKey } from "@bitwarden/common/platform/models/domain/symmetric-crypto-key";

export class WebauthnAssertionView {
  constructor(readonly token: string, readonly prfKey?: SymmetricCryptoKey) {}
}
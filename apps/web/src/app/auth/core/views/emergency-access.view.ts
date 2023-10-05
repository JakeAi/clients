import { KdfType } from "@bitwarden/common/enums";
import { CipherResponse } from "@bitwarden/common/vault/models/response/cipher.response";

import { EmergencyAccessStatusType } from "../enums/emergency-access-status-type";
import { EmergencyAccessType } from "../enums/emergency-access-type";

export class EmergencyAccessGranteeView {
  id: string;
  granteeId: string;
  name: string;
  email: string;
  type: EmergencyAccessType;
  status: EmergencyAccessStatusType;
  waitTimeDays: number;
  creationDate: string;
  avatarColor: string;
}

export class EmergencyAccessGrantorView {
  id: string;
  grantorId: string;
  name: string;
  email: string;
  type: EmergencyAccessType;
  status: EmergencyAccessStatusType;
  waitTimeDays: number;
  creationDate: string;
  avatarColor: string;
}

export class EmergencyAccessTakeoverTypeView {
  keyEncrypted: string;
  kdf: KdfType;
  kdfIterations: number;
  kdfMemory?: number;
  kdfParallelism?: number;
}

export class EmergencyAccessViewTypeView {
  keyEncrypted: string;
  ciphers: CipherResponse[] = [];
}

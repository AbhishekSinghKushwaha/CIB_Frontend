export interface TransactionListmodel {
  amount?: number;
  approvalStatus?: number;
  beneficiaryAccount?: string;
  beneficiaryBank?: string;
  beneficiaryBankCode?: string;
  beneficiaryCurrency?: string;
  beneficiaryName?: string;
  conversionRate?: number;
  currency?: string;
  documents?: [];
  fxReferenceID?: string;
  narration?: string;
  paymentReason?: string;
  paymentReference?: string;
  phoneNumber?: string;
  requestReference?: string;
  response?: string;
  sourceAccount?: string;
  sourceAccountName?: string;
  sourceBank?: string;
  sourceBankCode?: string;
  transactionStatus?: number;
  transferCharge?: number;
  transferType?: number;
  date?: string;
}

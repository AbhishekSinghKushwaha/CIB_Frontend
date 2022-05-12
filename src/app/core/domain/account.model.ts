export interface AccountModel {
  bankId?: string;
  accountNumber: string;
  accountName: string;
  accountType: null;
  transactionLimit: null;
  balance: number;
  paidAmount?: number;
  currency: string;
  installmentAmount?: number;
  nextInstallmentDate?: string;
}
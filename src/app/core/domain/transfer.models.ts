export interface FromAccount {
  balance: number;
  currency: string;
  accountName?: string;
  accountNumber: number;
  accountType?: 'Savings' | 'Current' | 'Mobile account';
  transactionLimit: number;
  balanceHidden?: false;
  bankId?: string;
  cards?: any[];
  cif?: string;
  countryCode?: string;
  instalmentAmount?: string;
  nextPaymentDueInNumOfDays?: number;
  nickName?: string;
  openDate?: string;
  percentCompleted?: number;
  productName?: string;
  remainingNumberOfInstalments?: string;
  status?: string;
  rbsNumber?: string;
  schemeCode?: string;
}

export interface LimitModel {
  dailyAmount?: number;
  dailyAmountRemaining?: number;
  maxAmount?: number;
  minAmount?: number;
}

export interface CurrencyModel {
  id?: any;
  currencyCode: string;
  currencyDescription?: string;
}

export interface TransferAmount {
  amount: number;
  currency: string;
  isWithinLimit?: boolean;
}

export interface TransactionTypeModel {
  id?: string;
  name?: string;
}

export interface MobileOperator {
  id?: string;
  operatorName?: string;
  operatorIconPath?: string;
  serviceName?: string; // i.e MPESA, Equitel Money
  serviceIconPath?: string; // i.e Mpesa Icon logo
  operatorCountry?: string;
}

export interface TransferTypeDTO {
  OWN_EQUITY: string,
  INTRA_BANK: string,
  INTER_BANK: string,
  EFT: string,
  SWIFT: string,
  RTGS: string,
  BUY_GOODS: string,
  MOBILE_MONEY: string,
  BUY_AIRTIME: string,
  PESALINK: string,
  INTER_COUNTRY_TRANSFER: string
}
export interface BankModel {
  shortBankName: string;
  bankName: string;
  bankCode: string;
  branchCode: string;
  pesalink: boolean;
  bic: string;
  accountLength: string;
  swift: boolean;
  rtgs: boolean;
  pic: string;
  isDirectPesalink: boolean;
}

export interface SubsidiaryModel {
  countryCode: string;
  countryName: string;
  currency: string;
  currencySymbol: string;
  nationality: string;
  dialCode: string;
  flagPath: string;
  operatingCountry: boolean;
  countryCode3Chars: null;
}

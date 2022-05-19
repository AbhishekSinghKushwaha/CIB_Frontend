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

export interface CountryModel {
  id?: string;
  countryCode: string;
  countryName: string;
  currency: string;
  currencySymbol: string;
  nationality: string;
  dialCode: string;
  flagPath: string;
  operatingCountry: boolean;
  countryCode3Chars: string;
}


export interface BillersModel {
  shortName?: string;
  code?: string;
  name?: string;
  surCharge?: number;
  logoUrl?: string;
  isActive?: boolean;
  customFields?: []
}

export interface BillersCustomFieldModel {
  id?: number,
  name?: string,
  length?: number,
  isRequired?: boolean,
  errorMessage?: string,
  dataType?: number,
  dropDownType?: number,
  hasDropDown?: boolean
  dropDown?: []
}

import { BankModel, CountryModel } from "./bank.model";
import { FromAccount, MobileWallet } from "./transfer.models";

export interface BeneficiaryModel {
  id?: number;
  country?: CountryModel;
  accountNumber: string;
  accountName?: string;
  bank?: BankModel;
  mobileWallet?: MobileWallet;
  phoneNumber?: any;
  tillNumber?: any;
  tillName?: any;
  fullName?: any;
  firstName?: string;
  lastName?: string;
  IBANNumber?: string;
  streetAddress?: string;
  postalAddress?: string;
  transferType: string;
  favourite: boolean;
  fromAccount?: FromAccount;
}

export interface BenefiaryTypeFieldMetadataInterface {
  controlType: string;
  dataType: string;
  formControlName: string;
  label: string;
  valueFromField?: string;
  onclick?: () => void | null;
  required?: boolean;
  acceptSearch?: boolean;
}

export interface BeneficiaryTypeFieldInterface {
  fieldType: string;
  metadata: BenefiaryTypeFieldMetadataInterface;
}

import { BankModel, CountryModel } from "./bank.model";
import { FromAccount, MobileOperator } from "./transfer.models";

export interface BeneficiaryModel {
  id?: number;
  country?: CountryModel;
  accountNumber: string;
  accountName?: string;
  bank?: BankModel;
  mobileOperator?: MobileOperator;
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
  fromAccount: FromAccount;
}

export interface BenefiaryTypeFieldMetadataInterface {
  controlType: string;
  dataType: string;
  formControlName: string;
  label: string;
  valueFromField?: string;
  onclick?: () => void | null;
  required?: boolean;
}

export interface BeneficiaryTypeFieldInterface {
  fieldType: string;
  metadata: BenefiaryTypeFieldMetadataInterface;
}
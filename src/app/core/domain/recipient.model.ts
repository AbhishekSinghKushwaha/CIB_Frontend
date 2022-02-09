import { BankModel } from './bank.model';
import { CountryModel } from './bank.model';
import { MobileOperator } from './transfer.models';
export interface recipientModel {
  country?: CountryModel;
  accountNumber: string;
  accountName?: string;
  bank?: BankModel;
  mobileOperator?: MobileOperator;
  phoneNumber?: any;
  tillNumber?: any;
  tillName?: any;
  firstName?: string;
  lastName?: string;
  IBANNumber?: string;
  streetAddress?: string;
  postalAddress?: string;
}

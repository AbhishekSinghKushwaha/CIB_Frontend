import { BankModel } from "./bank.model";
import { CountryModel } from "./bank.model";
import { MobileWallet, Telco } from "./transfer.models";
export interface RecipientModel {
  country?: CountryModel;
  accountNumber: string;
  accountName?: string;
  bank?: BankModel;
  mobileWallet?: MobileWallet;
  phoneNumber?: any;
  tillNumber?: any;
  tillName?: any;
  firstName?: string;
  lastName?: string;
  IBANNumber?: string;
  streetAddress?: string;
  postalAddress?: string;
  telco?: Telco;
}

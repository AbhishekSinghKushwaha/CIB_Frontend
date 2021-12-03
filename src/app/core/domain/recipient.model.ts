import { BankModel } from './bank.model';
import { CountryModel } from './country.model';
export interface recipientModel {
  country?: CountryModel;
  accountNumber: string;
  accountName?: string;
  bank?: BankModel;
}

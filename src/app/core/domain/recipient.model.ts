import { BankModel } from './bank.model';
import { CountryModel } from './bank.model';
export interface recipientModel {
  country?: CountryModel;
  accountNumber: string;
  accountName?: string;
  bank?: BankModel;
}

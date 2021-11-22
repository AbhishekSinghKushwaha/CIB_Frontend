import { TransactMenuItem } from "./transact-menu-item.model";

export interface BeneficiaryModel {
  id?: number;
  name: string;
  bank: string;
  accountNumber: string;
  transactionType: string;
}

export interface StatementListModel {
  transactionDate: string;
  valueDate: string;
  narrative: string;
  transactionReference: string;
  debit?: number;
  credit?: number;
  runningBalance: number;
}

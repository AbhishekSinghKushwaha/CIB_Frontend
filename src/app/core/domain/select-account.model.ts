export interface SelectAccountModel {
  name: string;
  balance: number;
  currency: string;
  type: 'Savings' | 'Current' | 'Mobile account';
}

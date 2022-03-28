
export interface TransactionListmodel {
  title: string,
  description: string,
  amount: string,
  date: string,
  status: 'Approved' | 'Rejected' | 'Pending',
}

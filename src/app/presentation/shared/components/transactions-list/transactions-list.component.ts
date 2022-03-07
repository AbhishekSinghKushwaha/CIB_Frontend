import { PaginationModel } from './../../../../core/domain/pagination.model';
import { Component, OnInit, Input } from '@angular/core';
import { TransactionListmodel } from 'src/app/core/domain/transaction-list.model';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  private _searchText: string;
  get searchText(): string {
    return this._searchText;
  }
  set searchText(input: string) {
    const value = input.toLowerCase();
    this.transactions = [];
    for (const transaction of this.originalTransactions) {
      if (transaction.amount.toLowerCase().indexOf(value) > -1 ||
        transaction.date.toLowerCase().indexOf(value) > -1 ||
        transaction.description.toLowerCase().indexOf(value) > -1 ||
        transaction.status.toLowerCase().indexOf(value) > -1 ||
        transaction.title.toLowerCase().indexOf(value) > -1
      ) {
        this.transactions.push(transaction)
      }
    }
    this._searchText = input;
    this.paginationData = new PaginationModel(10, [10, 25, 40, 60], this.transactions.length);
  };
  private _category: string;
  get category() {
    return this._category
  }
  paginationData: PaginationModel;
  transactions: TransactionListmodel[] = [];
  originalTransactions: TransactionListmodel[] = [];
  transactionIcon = { Approved: 'transaction_approved', Rejected: 'transaction_rejected', Pending: '' };

  @Input() set category(category: string) {
    this._category = category;
    this.loadTransactions();
  };

  constructor() { }

  ngOnInit(): void {
  }

  loadTransactions() {
    this.category === 'history' ?
      this.originalTransactions = Array(35).fill(0).map((x, i) => ({
        title: 'Reference C38437393944034',
        description: 'MOBILE WALLET TRANSFER TO LESLIE ISAH',
        amount: '000,000.00 KES',
        date: 'Thu,23 Aug',
        status: i % 2 === 0 ? 'Approved' : 'Rejected'
      })) :
      this.originalTransactions = Array(32).fill(0).map((x, i) => ({
        title: 'Reference C38437393944034',
        description: 'MOBILE WALLET TRANSFER TO LESLIE ISAH',
        amount: '000,000.00 KES',
        date: 'Thu,23 Aug',
        status: 'Pending'
      }));
    this.transactions = [...this.originalTransactions];
    this.paginationData = new PaginationModel(10, [10, 25, 40, 60], this.transactions.length);
  }

}

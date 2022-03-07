import { PaginationModel } from './../../../../core/domain/pagination.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {
  searchText: string;
  _category: string;
  paginationData: PaginationModel;
  transactions: {
    title: string,
    description: string,
    amount: string,
    date: string,
    status: 'Approved' | 'Rejected' | 'Pending',
  }[] = [];
  transactionIcon = { Approved: 'transaction_approved', Rejected: 'transaction_rejected', Pending: '' }

  get category() {
    return this._category
  }
  @Input() set category(category: string) {
    this._category = category;
    this.loadTransactions();
  };

  constructor() { }

  ngOnInit(): void {
  }

  loadTransactions() {
    this.category === 'history' ?
      this.transactions = Array(35).fill(0).map((x, i) => ({
        title: 'Reference C38437393944034',
        description: 'MOBILE WALLET TRANSFER TO LESLIE ISAH',
        amount: '000,000.00 KES',
        date: 'Thu,23 Aug',
        status: i % 2 === 0 ? 'Approved' : 'Rejected'
      })) :
      this.transactions = Array(32).fill(0).map((x, i) => ({
        title: 'Reference C38437393944034',
        description: 'MOBILE WALLET TRANSFER TO LESLIE ISAH',
        amount: '000,000.00 KES',
        date: 'Thu,23 Aug',
        status: 'Pending'
      }));
    this.paginationData = new PaginationModel(10, [10, 25, 40, 60], this.transactions.length);
  }

}

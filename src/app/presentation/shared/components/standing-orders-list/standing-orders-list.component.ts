import { PaginationModel } from './../../../../core/domain/pagination.model';
import { Component, OnInit, Input } from '@angular/core';
import { StandingOrdersListmodel } from 'src/app/core/domain/standing-orders-list.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/core/services/delete/delete.service';

@Component({
  selector: 'app-standing-orders-list',
  templateUrl: './standing-orders-list.component.html',
  styleUrls: ['./standing-orders-list.component.scss']
})
export class StandingOrdersListComponent implements OnInit {

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
  transactions: StandingOrdersListmodel[] = [];
  originalTransactions: StandingOrdersListmodel[] = [];
  transactionIcon = { Active: 'transaction_approved', Inactive: 'transaction_pending' };

  @Input() set category(category: string) {
    this._category = category;
    this.loadStandingOrders();
  };

  constructor(
    private readonly router: Router,
    private readonly deleteService: DeleteService
    ) { }

  ngOnInit(): void {
  }

  loadStandingOrders() {
    this.originalTransactions = mockData.standingOrders;
    this.transactions = [...this.originalTransactions];
    this.paginationData = new PaginationModel(10, [10, 25, 40, 60], this.transactions.length);
  }

  openTransaction(data: StandingOrdersListmodel, index: number) {
    this.router.navigate([`transact/standing-orders/detail/${index}`])
  }

  openCancel() {
    const payload = {
      title: 'Are you sure?',
      message: 'Once you cancel the standing order for airtime?',
      buttonNo: "No, I'm not",
      buttonYes: "Yes, I’m sure"
    }
    this.deleteService.open(payload);
  }

  editStandingOrder(index: number) {
    this.router.navigate([`transact/standing-orders/edit/${index}`])
  }

}

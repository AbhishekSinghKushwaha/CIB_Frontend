import { PaginationModel } from './../../../../core/domain/pagination.model';
import { Component, OnInit, Input } from '@angular/core';
import { StandingOrdersListmodel } from 'src/app/core/domain/standing-orders-list.model';
import { mockData } from 'src/app/core/utils/constants/mockdata.constants';
import { Router } from '@angular/router';
import { DeleteService } from 'src/app/core/services/delete/delete.service';
import { StandingOrdersService } from "src/app/core/services/transfers/standing-orders/standing-orders.service";

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
    for (const transaction of this.transactions) {
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
  transactions: any[] = [];
  transactionIcon = { Active: 'transaction_approved', Inactive: 'transaction_pending' };

  @Input() set category(category: string) {
    this._category = category;
    this.loadStandingOrders();
  };

  constructor(
    private readonly router: Router,
    private readonly deleteService: DeleteService,
    private readonly standingOrdersService: StandingOrdersService
    ) { }

  ngOnInit(): void {
  }

  loadStandingOrders() {
    this.standingOrdersService.getStandingOrders().subscribe((response) => {
      this.transactions = response.data;
      console.log(this.transactions);
      this.paginationData = new PaginationModel(10, [10, 25, 40, 60], this.transactions.length);
    });
  }

  openTransaction(data: StandingOrdersListmodel, index: number) {
    this.router.navigate([`transact/standing-orders/detail/${index}`])
  }

  openCancel(data: StandingOrdersListmodel, index: any) {
    const payload = {
      title: 'Are you sure?',
      message: 'Once you cancel the standing order for ' + data.title + '?',
    }
    // this.deleteService.open(payload);
    const deactivatePayload = {
      id: Number(index)
    }
    const modal = this.deleteService.open(payload);
    modal.afterClosed().subscribe(() => {
      this.standingOrdersService.deactivateStandingOrder(deactivatePayload).subscribe((res) => {
        if (res.status) {
          this.loadStandingOrders();
        }
      });
    });
  }

  editStandingOrder(index: number) {
    this.router.navigate([`transact/standing-orders/edit/${index}`])
  }

}

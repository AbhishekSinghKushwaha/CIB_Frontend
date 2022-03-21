import { PaginationModel } from "./../../../../core/domain/pagination.model";
import { Component, OnInit, Input } from "@angular/core";
import { TransactionListmodel } from "src/app/core/domain/transaction-list.model";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { Router } from "@angular/router";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"],
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
      if (
        transaction.amount.toLowerCase().indexOf(value) > -1 ||
        transaction.date.toLowerCase().indexOf(value) > -1 ||
        transaction.description.toLowerCase().indexOf(value) > -1 ||
        transaction.status.toLowerCase().indexOf(value) > -1 ||
        transaction.title.toLowerCase().indexOf(value) > -1
      ) {
        this.transactions.push(transaction);
      }
    }
    this._searchText = input;
    this.paginationData = new PaginationModel(
      10,
      [10, 25, 40, 60],
      this.transactions.length
    );
  }
  private _category: string;
  get category() {
    return this._category;
  }
  paginationData: PaginationModel;
  transactions: TransactionListmodel[] = [];
  originalTransactions: TransactionListmodel[] = [];
  transactionIcon = {
    Approved: "transaction_approved",
    Rejected: "transaction_rejected",
    Pending: "",
  };

  @Input() set category(category: string) {
    this._category = category;
    this.loadTransactions();
  }

  constructor(
    private readonly router: Router,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {}

  loadTransactions() {
    this.category === "history"
      ? (this.originalTransactions = mockData.histororicalTransactions)
      : (this.originalTransactions = mockData.pendingTransactions);
    this.transactions = [...this.originalTransactions];
    this.paginationData = new PaginationModel(
      10,
      [10, 25, 40, 60],
      this.transactions.length
    );
  }

  openTransaction(data: TransactionListmodel, index: number) {
    this.router.navigate([`activities/detail/${index}/${this.category}`]);
  }

  getTransactions() {
    this.transactionsService.getTransactions().subscribe((res) => {
      console.log(res);
    });
  }
}

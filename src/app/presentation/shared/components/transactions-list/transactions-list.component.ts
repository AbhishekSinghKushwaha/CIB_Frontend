import { PaginationModel } from "./../../../../core/domain/pagination.model";
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { TransactionListmodel } from "src/app/core/domain/transaction-list.model";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { Router } from "@angular/router";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-transactions-list",
  templateUrl: "./transactions-list.component.html",
  styleUrls: ["./transactions-list.component.scss"],
})
export class TransactionsListComponent implements OnInit, OnChanges {
  private _searchText: string;

  searchText: any;
  // get searchText(): string {
  //   return this._searchText;
  // }

  // set searchText(input: string) {
  //   const value = input.toLowerCase();
  //   this.transactions = [];
  //   for (const transaction of this.originalTransactions) {
  //     if (
  //       transaction.amount.toLowerCase().indexOf(value) > -1 ||
  //       transaction.date.toLowerCase().indexOf(value) > -1 ||
  //       transaction.description.toLowerCase().indexOf(value) > -1 ||
  //       transaction.status.toLowerCase().indexOf(value) > -1 ||
  //       transaction.title.toLowerCase().indexOf(value) > -1
  //     ) {
  //       this.transactions.push(transaction);
  //     }
  //   }
  //   this._searchText = input;
  //   this.paginationData = new PaginationModel(
  //     10,
  //     [10, 25, 40, 60],
  //     this.transactions.length
  //   );
  // }
  paginationData: PaginationModel;

  transactionIcon = {
    Approved: "transaction_approved",
    Rejected: "transaction_rejected",
    Pending: "transaction_pending",
  };

  @Input() category: string;
  @Input() pendingTransactions: TransactionListmodel[] = [];
  @Input() historyTransactions: TransactionListmodel[] = [];
  @Input() standingOrderTransactions: TransactionListmodel[] = [];

  approvalStatus = TransactionTypeConstants.TransactionApprovalStatus;

  constructor(
    private readonly router: Router,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
  }

  openTransaction(data: TransactionListmodel, index: number) {
    this.router.navigate([`activities/detail/${index}/${this.category}`]);
  }

  getTransactionStatusKey(status: number): string {
    let approvalStatus = "";
    for (const [key, value] of Object.entries(this.approvalStatus)) {
      if (value === status) {
        approvalStatus = key;
      }
    }
    return approvalStatus;
  }
}

import { Component, OnInit } from "@angular/core";
import { TransactionListmodel } from "src/app/core/domain/transaction-list.model";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import * as moment from "moment";
@Component({
  selector: "app-payments-and-transactions",
  templateUrl: "./payments-and-transactions.component.html",
  styleUrls: ["./payments-and-transactions.component.scss"],
})
export class PaymentsAndTransactionsComponent implements OnInit {
  pendingTransactions = [];
  historyTransactions = [];
  transactionSummary: any;

  dateRange = {
    from: "",
    to: "",
  };
  constructor(private transactionsService: TransactionsService) {
    this.dateRange.to = moment().format();
    this.dateRange.from = moment(this.dateRange.to)
      .subtract(1, "month")
      .format();
  }

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    const params = {
      page: 1,
      pageSize: 350,
      From: this.dateRange.from,
      To: this.dateRange.to, // Automatically picks todays date
      TransactionType: "",
      ApprovalStatus: 1,
    };
    this.transactionsService.getTransactions(params).subscribe((res) => {
      if (res.status) {
        console.log(res);
        this.transactionSummary = res.data;

        this.pendingTransactions = this.transactionSummary.transactions.dataList
          .filter((transaction: TransactionListmodel) => {
            return (
              transaction.approvalStatus ===
              TransactionTypeConstants.TransactionApprovalStatus.Pending
            );
          })
          .reverse();

        this.transactionsService.setPendingTransactions(
          this.pendingTransactions
        );

        this.historyTransactions =
          this.transactionSummary.transactions.dataList.filter(
            (transaction: TransactionListmodel) => {
              return (
                transaction.approvalStatus ===
                  TransactionTypeConstants.TransactionApprovalStatus.Rejected &&
                transaction.approvalStatus ===
                  TransactionTypeConstants.TransactionApprovalStatus.Approved
              );
            }
          );

        this.transactionsService.setHistoryTransactions(
          this.historyTransactions
        );
      }
    });
  }
}

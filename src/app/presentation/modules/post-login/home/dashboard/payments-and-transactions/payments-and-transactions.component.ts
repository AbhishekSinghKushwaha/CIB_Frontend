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

  approvalStatus = TransactionTypeConstants.TransactionApprovalStatus;

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
    this.getPendingTransactions();
    this.getHistoryTransactions();
  }

  getPendingTransactions() {
    const params = {
      page: 1, // To be set by pagination controls
      pageSize: 350, // To be set by pagination controls
      From: this.dateRange.from, // Automaticall sets a month ago from today's date
      To: this.dateRange.to, // Automatically picks todays date
      TransactionType: "",
      ApprovalStatus: [this.approvalStatus.Pending], // To change to allow for filters
    };

    this.transactionsService.getTransactions(params).subscribe((res) => {
      if (res.status) {
        this.pendingTransactions = res.data.transactions.dataList;
        this.transactionsService.setPendingTransactions(
          this.pendingTransactions
        );
      }
    });
  }

  getHistoryTransactions() {
    const params = {
      page: 1, // To be set by pagination controls
      pageSize: 350, // To be set by pagination controls
      From: this.dateRange.from, // Automaticall sets a month ago from today's date
      To: this.dateRange.to, // Automatically picks todays date
      TransactionType: "",
      ApprovalStatus: [
        this.approvalStatus.Approved,
        this.approvalStatus.Rejected,
      ],
    };

    this.transactionsService.getTransactions(params).subscribe((res) => {
      if (res.status) {
        this.historyTransactions = res.data.transactions.dataList;
        this.transactionsService.setHistoryTransactions(
          this.historyTransactions
        );
      }
    });
  }
}

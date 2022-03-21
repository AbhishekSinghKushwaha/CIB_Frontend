import { Component, OnInit } from "@angular/core";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";

@Component({
  selector: "app-payments-and-transactions",
  templateUrl: "./payments-and-transactions.component.html",
  styleUrls: ["./payments-and-transactions.component.scss"],
})
export class PaymentsAndTransactionsComponent implements OnInit {
  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.getTransactions();
  }

  getTransactions() {
    this.transactionsService.getTransactions().subscribe((res) => {
      console.log(res);
    });
  }
}

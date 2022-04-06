import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { TransactionReceiptModalService } from "src/app/core/services/modal-services/transaction-receipt-modal/transaction-receipt-modal.service";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";

@Component({
  selector: "app-transaction-receipt-modal",
  templateUrl: "./transaction-receipt-modal.component.html",
  styleUrls: ["./transaction-receipt-modal.component.scss"],
})
export class TransactionReceiptModalComponent implements OnInit {
  view = "main";
  downloadOptions = ["PDF", "CSV", "MT840", "Excel"];

  @ViewChild("receiptDownload") pdfTable: ElementRef;

  constructor(
    private readonly transactionReceiptModalService: TransactionReceiptModalService,
    private transactionService: TransactionsService
  ) {}

  ngOnInit(): void {}

  close() {
    this.transactionReceiptModalService.close();
  }

  setView() {
    this.view = "download";
  }

  public downloadAsPDF() {}

  download(item: any) {
    if (item === "PDF") {
      this.transactionService
        .downloadReceiptAsPdf({
          paymentReference: "77B4732F36",
        })
        .subscribe((res) => {
          const myFile = new File([res], "receipt.pdf", {
            type: res.type,
          });
          console.log(myFile);
          const url = window.URL.createObjectURL(myFile);
          window.open(url);
        });
    }
  }
}

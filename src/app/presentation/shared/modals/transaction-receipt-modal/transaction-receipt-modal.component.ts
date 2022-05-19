import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Subscription } from "rxjs";
import { FromAccount } from "src/app/core/domain/transfer.models";
import { TransactionReceiptModalService } from "src/app/core/services/modal-services/transaction-receipt-modal/transaction-receipt-modal.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";

@Component({
  selector: "app-transaction-receipt-modal",
  templateUrl: "./transaction-receipt-modal.component.html",
  styleUrls: ["./transaction-receipt-modal.component.scss"],
})
export class TransactionReceiptModalComponent implements OnInit {
  view = "main";
  downloadOptions = [
    { option: "PDF", id: 1 },
    { option: "CSV", id: 2 },
    { option: "EXCEL", id: 3 },
    { option: "MT940", id: 4 },
  ];

  @ViewChild("receiptDownload") pdfTable: ElementRef;

  sourceAccout: FromAccount;

  subscriptions: Subscription[] = [];

  currentUser: any;

  constructor(
    private readonly transactionReceiptModalService: TransactionReceiptModalService,
    private transactionService: TransactionsService,
    private readonly sharedService: SharedDataService,
    private storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getSourceAccount();
    this.currentUser = this.storageService.getData("currentUserData");
    console.log(this.data);
  }

  close() {
    this.transactionReceiptModalService.close();
  }

  setView() {
    this.view = "download";
  }

  public downloadAsPDF() {}

  download(item: any) {
    const payload = {
      paymentReference: this.data.requestReference,
      format: item,
    };
    this.transactionService.downloadReceiptAsPdf(payload).subscribe((res) => {
      console.log(res);
      const myFile = new File([res], "receipt.pdf", {
        type: res.type,
      });
      console.log(myFile);
      const url = window.URL.createObjectURL(myFile);
      window.open(url);
    });
  }

  getSourceAccount() {
    this.subscriptions.push(
      this.sharedService.userAccounts$.subscribe((res) => {
        const account = res.find(
          (v) => v.accountNumber === this.data.sourceAccount
        );
        this.sourceAccout = account || {};
      })
    );
  }
}

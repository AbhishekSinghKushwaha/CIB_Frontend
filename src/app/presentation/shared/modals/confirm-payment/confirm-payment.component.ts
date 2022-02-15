import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-confirm-payment",
  templateUrl: "./confirm-payment.component.html",
  styleUrls: ["./confirm-payment.component.scss"],
})
export class ConfirmPaymentComponent implements OnInit {
  transferType = TransactionTypeConstants.TransferType;
  transactionType: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public paymentData: any,
    private dialogRef: MatDialogRef<ConfirmPaymentComponent>
  ) {
    console.log(paymentData);
  }

  ngOnInit(): void {
    this.formatTransactionType();
  }

  submitReview() {
    this.dialogRef.close({ confirmed: true });
  }

  close() {
    this.dialogRef.close({ confirmed: false });
  }

  formatTransactionType() {
    switch (this.paymentData.transactionType) {
      case this.transferType.OWN_EQUITY:
        this.transactionType = "Send To Your Own Equity Account";
        break;
      case this.transferType.INTRA_BANK:
        this.transactionType = "Send To An Equity Account";
        break;
      case this.transferType.INTER_BANK:
        this.transactionType = "Send To Another Bank";
        break;
      case this.transferType.EFT:
        this.transactionType = "Send to another bank via EFT";
        break;
      case this.transferType.RTGS:
        this.transactionType = "Send to another bank via RTGS";
        break;
      case this.transferType.MOBILE_MONEY:
        this.transactionType = "Send via Mobile Money";
        break;
      case this.transferType.PESALINK:
        this.transactionType = "Send via Pesalink";
        break;
      case this.transferType.SWIFT:
        this.transactionType = "Send to another bank via SWIFT";
        break;
      case this.transferType.BUY_AIRTIME:
        this.transactionType = "Buy Airtime";
        break;
      case this.transferType.BUY_GOODS:
        this.transactionType = "Buy Goods";
        break;
      default:
        break;
    }
  }
}

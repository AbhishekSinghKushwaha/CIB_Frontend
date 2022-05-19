import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-confirm-bill",
  templateUrl: "./confirm-bill.component.html",
  styleUrls: ["./confirm-bill.component.scss"],
})
export class ConfirmBillComponent implements OnInit {
  transferType: string;
  transactionType: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public paymentData: any,
    private dialogRef: MatDialogRef<ConfirmBillComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.paymentData);
    this.transactionType = this.paymentData.transactionType
  }

  submitReview() {
    this.dialogRef.close({ confirmed: true });
  }

  close() {
    this.dialogRef.close({ confirmed: false });
  }


}

import { ConfirmBillComponent } from './../../../../shared/modals/confirm-bill/confirm-bill.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { BaseTransactComponent } from '../base-transact.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BillServiceService } from 'src/app/core/services/transfers/bill-service/bill-service.service';
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

@Component({
  selector: 'app-pay-bills',
  templateUrl: './pay-bills.component.html',
  styleUrls: ['./pay-bills.component.scss']
})
export class PayBillsComponent
  extends BaseTransactComponent implements OnInit {
  transferType = TransactionTypeConstants.TransferType;
  payBillTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly billServices: BillServiceService
  ) {
    super(snackbar);
  }

  ngOnInit(): void {
    this.initForm()
  }

  get getForm() {
    return this.payBillTransferForm.controls;
  }

  initForm(): void {
    this.payBillTransferForm = this.fb.group({
      payFrom: ["", [Validators.required]],
      payTo: [""],
      amount: [{}, [Validators.required]],
      reason: [""],
      fxReferenceId: ["", [Validators.required]],
      schedulePayment: ["", [Validators.required]],

    })
  }

  validateBill() {
    const payload = {
      billType: 1,
      billerCode: this.getForm.payTo.value.code,
      accountNumber: this.getForm.payFrom.value.accountNumber,
      accountName: this.getForm.payFrom.value.accountName,
      amount: this.getForm.amount.value.amount,
      customFields: this.getForm.payTo.value.customFields
    }

    // this.billServices
    //   .postValidateBill(payload)
    //   .subscribe((res) => {

    //   })
    this.billServices.billPaymentPayload(payload);
    this.router.navigate([
      `/transact/otp-verification/${this.transferType.BILL_PAYMENT}`,
    ])

  }

  confirmBillPayment() {
    const paymentData = {
      from: this.getForm.payFrom.value,
      to: this.getForm.payTo.value,
      amount: this.getForm.amount.value,
      transactionType: 'Bill Payment',
      paymentReason: this.getForm.reason.value,
      fxReferenceId: this.getForm.fxReferenceId.value,
      schedulePayment: this.getForm.schedulePayment.value
    };
    const dialogRef = this.dialog.open<ConfirmBillComponent, any>(ConfirmBillComponent, {
      data: paymentData,
      disableClose: true
    })

    console.log(this.getForm)

    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.confirmed) {
        this.validateBill();
      }
    });
  }

}



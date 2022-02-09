import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTransactComponent } from '../base-transact.component';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { UniversalValidators } from 'ngx-validators';
import { OwnAccountService } from 'src/app/core/services/transfers/own-account/own-account.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

@Component({
  selector: 'app-buy-goods',
  templateUrl: './buy-goods.component.html',
  styleUrls: ['./buy-goods.component.scss'],
})
export class BuyGoodsComponent extends BaseTransactComponent implements OnInit {
  buyGoodsForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;
  constructor(
    private readonly fb: FormBuilder,
    snackBar: MatSnackBar,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router
  ) {
    super(snackBar);
  }

  get getForm() {
    return this.buyGoodsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.buyGoodsForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: ['', [Validators.required]],
      fxReferenceId: ['', [Validators.required]],
      schedulePayment: ['', [Validators.required]],
    });
  }

  openSupportingDocuments(): void {}

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1, // For Own Equity Account
    };
    this.ownEquityAccountService
      .getTransferCharges(payload)
      .subscribe((res) => {
        if (res.status) {
          this.confirmPayment(res.data);
        } else {
          // TODO:: Notify error
        }
      });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    if (this.buyGoodsForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: 'Buy goods',
        paymentReason: this.getForm.reason.value,
        fxReferenceId: this.getForm.fxReferenceId.value,
        schedulePayment: this.getForm.schedulePayment.value,
        transferFee,
      };
      const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
        data: paymentData,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res.confirmed) {
          // this.sendMoney();
          this.otpVerification();
        }
      });
    } else {
    }
  }
  otpVerification() {
    this.router.navigate(['/transact/buy-goods/otp-verification']);
  }

  // Initiate fund transfer to buy goods.
  sendMoney() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: '',
      beneficiaryBankCode: '',
      beneficiaryCurrency: this.getForm.sendTo.value.currency,
      beneficiaryName: this.getForm.sendTo.value.accountName,
      currency: this.getForm.amount.value.currency,
      fxReferenceId: this.getForm.fxReferenceId.value,
      paymentReason: this.getForm.reason.value,
      schedulePayment: this.getForm.schedulePayment.value,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1, // Buy goods
    };
    if (this.buyGoodsForm.valid) {
      this.ownEquityAccountService
        .sendToOwnEquityAccount(payload)
        .subscribe((res) => {
          if (res.status) {
            this.router.navigate(['/transact/buy-goods/otp-verification']);
          } else {
            alert(res.message);
            // TODO:: Notify Error
          }
        });
    }
  }
}

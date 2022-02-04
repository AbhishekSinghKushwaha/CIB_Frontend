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
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';

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
    private buyGoodsService: BuyGoodsService,
    public dialog: MatDialog,
    private readonly router: Router,
  ) {
    super(snackBar);
  }

  get getForm() {
    return this.buyGoodsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.buyGoodsService.getMerchants();
    this.buyGoodsService.getFavouriteMerchants();
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
      transferType: this.transferType.BUY_GOODS,
    };
    this.buyGoodsService
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
        transactionType: this.transferType.BUY_GOODS,
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
      beneficiaryBank: this.getForm.sendTo.value.bank.bankName,
      beneficiaryBankCode: this.getForm.sendTo.value.bank.bankCode,
      beneficiaryCurrency: this.getForm.sendTo.value.currency,
      beneficiaryName: this.getForm.sendTo.value.accountName,
      currency: this.getForm.amount.value.currency,
      fxReferenceId: this.getForm.fxReferenceId.value,
      paymentReason: this.getForm.reason.value,
      schedulePayment: {
        frequency: this.getForm.schedulePayment.value.frequency.value,
        reminderDay: this.getForm.schedulePayment.value.reminderDay.value,
        startDate: this.getForm.schedulePayment.value.startDate.toISOString(),
        endDate: this.getForm.schedulePayment.value.endDate.toISOString(),
      },
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: this.transferType.BUY_GOODS,
    };
    if (this.buyGoodsForm.valid) {
      this.buyGoodsService.sendToBuyGoods(payload).subscribe(
        (res) => {
          if (res.status) {
            this.router.navigate([
              '/transact/buy-goods/otp-verification',
            ]);
          } else {
            console.log(res.message);
            // TODO:: Notify Error
          }
        },
        (err) => {
          alert(
            `Sorry, we're unable to complete your transaction. Please give us some time to fix the problem and try again later.`
          );
        }
      );
    }
  }
}

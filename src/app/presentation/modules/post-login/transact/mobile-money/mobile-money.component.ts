import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';

@Component({
  selector: 'app-mobile-money',
  templateUrl: './mobile-money.component.html',
  styleUrls: ['./mobile-money.component.scss'],
})
export class MobileMoneyComponent implements OnInit {
  mobileMoneyTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;

  get getForm() {
    return this.mobileMoneyTransferForm.controls;
  }

  constructor(private readonly fb: FormBuilder, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.mobileMoneyTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: [''],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [''],
      fxReferenceId: ['', [Validators.required]],
      schedulePayment: ['', [Validators.required]],
    });
  }

  openSupportingDocuments(): void {
    // this.supportingDocumentsUploadService.open();
  }

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: this.transferType.OWN_EQUITY,
    };
    // this.ownEquityAccountService
    //   .getTransferCharges(payload)
    //   .subscribe((res) => {
    //     if (res.status) {
    //       this.confirmPayment(res.data);
    //     } else {
    //       // TODO:: Notify error
    //     }
    //   });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    if (this.mobileMoneyTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: this.transferType.MOBILE_MONEY,
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
          this.sendMoney();
        }
      });
    } else {
    }
  }

  // Initiate fund transfer to own equity account
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
      schedulePayment: {
        frequency: this.getForm.schedulePayment.value.frequency.value,
        reminderDay: this.getForm.schedulePayment.value.reminderDay.value,
        startDate: this.getForm.schedulePayment.value.startDate.toISOString(),
        endDate: this.getForm.schedulePayment.value.endDate.toISOString(),
      },
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: this.transferType.MOBILE_MONEY,
    };
    // if (this.ownEquityAccountTransferForm.valid) {
    //   this.ownEquityAccountService.sendToOwnEquityAccount(payload).subscribe(
    //     (res) => {
    //       if (res.status) {
    //         this.router.navigate([
    //           '/transact/other-equity-account/submit-transfer',
    //         ]);
    //       } else {
    //         alert(res.message);
    //         // TODO:: Notify Error
    //       }
    //     },
    //     (err) => {
    //       alert(
    //         `Sorry, we're unable to complete your transaction. Please give us some time to fix the problem and try again later.`
    //       );
    //     }
    //   );
    // }
  }
}

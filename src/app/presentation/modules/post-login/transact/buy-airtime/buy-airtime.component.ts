import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SupportingDocumentsUploadService } from 'src/app/core/services/supporting-documents-upload/supporting-documents-upload.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseTransactComponent } from '../base-transact.component';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { UniversalValidators } from 'ngx-validators';
import { OwnAccountService } from 'src/app/core/services/transfers/own-account/own-account.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AirtimeFailedService } from 'src/app/core/services/airtime-failed/airtime-failed.service';
import { AirtimeSuccessService } from 'src/app/core/services/airtime-success/airtime-success.service';

@Component({
  selector: 'app-buy-airtime',
  templateUrl: './buy-airtime.component.html',
  styleUrls: ['./buy-airtime.component.scss']
})
export class BuyAirtimeComponent extends BaseTransactComponent implements OnInit {

  airTimeForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  loading: boolean = false;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly airtimeFailedService: AirtimeFailedService,
    private readonly airtimeSuccessService: AirtimeSuccessService,
  ) {
    super(snackbar);
  }

  get getForm() {
    return this.airTimeForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.airTimeForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: [''],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [''],
      fxReferenceId: ['', [Validators.required]],
      schedulePayment: ['', [Validators.required]],
    });
  }

  openSupportingDocuments(): void {
    this.supportingDocumentsUploadService.open();
  }

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    this.loading = true;
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
          this.loading = false;
          this.confirmPayment(res.data);
        } else {
          this.loading = false;
          // TODO:: Notify error
        }
      });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    if (this.airTimeForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: 'Buy Airtime',
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
          this.airtimeSuccessService.airtimeSuccess(paymentData);
          this.airtimePurchased();
        }
      });
    } else {
      this.loading = false;
    }
  }

  airtimePurchased() {
    const message = {
      title: 'Something went wrong',
      image: './assets/images/Illustrations/Illustrations_NoAccounts.svg',
      message: 'The system is unable to perform this payment task at the moment'
    }

    const insufficientBalance = {
      title: 'Insufficient balance',
      image: './assets/images/Illustrations/Illustrations_NoAccounts.svg',
      message: 'You currently don’t have sufficient funds for charges and amount.'
    }

    if (this.airTimeForm.valid) {
      this.router.navigate(['/transact/buy-airtime/success']);
    }
    else{
      this.airtimeFailedService.open(message);
    }

  }

  // Initiate fund transfer to own equity account
  sendMoney() {
    this.loading = true;
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
      transferType: 1, // Own Equity Account
    };
    if (this.airTimeForm.valid) {
      this.ownEquityAccountService.sendToOwnEquityAccount(payload).subscribe(
        (res) => {
          if (res.status) {
            this.loading = false;
            this.router.navigate([
              '/transact/other-equity-account/submit-transfer',
            ]);
          } else {
            this.loading = false;
            alert(res.message);
            // TODO:: Notify Error
          }
        },
        (err) => {
          this.loading = false;
          alert(
            `Sorry, we're unable to complete your transaction. Please give us some time to fix the problem and try again later.`
          );
        }
      );
    }
  }
}

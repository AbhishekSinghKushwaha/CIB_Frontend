import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { OwnAccountService } from 'src/app/core/services/transfers/own-account/own-account.service';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';
import { BaseTransactComponent } from '../../transact/base-transact.component';
import { SupportingDocumentsUploadService } from 'src/app/core/services/supporting-documents-upload/supporting-documents-upload.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';

@Component({
  selector: 'app-intercountry-fund-transfer',
  templateUrl: './intercountry-fund-transfer.component.html',
  styleUrls: ['./intercountry-fund-transfer.component.scss']
})
export class IntercountryFundTransferComponent extends BaseTransactComponent implements OnInit {

  intercountryFundTransfer: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  loading: boolean = false;
  transferType = TransactionTypeConstants.TransferType;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router
  ) {
    super(snackbar);
  }

  get getForm() {
    return this.intercountryFundTransfer.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.intercountryFundTransfer = this.fb.group({
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
    if (this.intercountryFundTransfer.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: 'Send money via intercountry',
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
          this.confirmation();
        }
      });
    } else {
      this.loading = false;
    }
  }

  confirmation() {
    this.router.navigate([
      '/more/intercountry-fund-transfer/submit-transfer',
    ]);
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
    if (this.intercountryFundTransfer.valid) {
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

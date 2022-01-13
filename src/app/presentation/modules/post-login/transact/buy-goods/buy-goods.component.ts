import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SupportingDocumentsUploadService } from 'src/app/core/services/supporting-documents-upload/supporting-documents-upload.service';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseTransactComponent } from '../base-transact.component';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { UniversalValidators } from 'ngx-validators';
import { OwnAccountService } from 'src/app/core/services/transfers/own-account/own-account.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-buy-goods',
  templateUrl: './buy-goods.component.html',
  styleUrls: ['./buy-goods.component.scss'],
})
export class BuyGoodsComponent extends BaseTransactComponent implements OnInit {
  schedulePaymentData: ScheduledPaymentModel;
  paymentDate: ScheduledPaymentModel;
  fundTransferBuyGoodsForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  loading: boolean = false;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackBar: MatSnackBar,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router
  ) {
    super(snackBar);
  }

  get getForm() {
    return this.fundTransferBuyGoodsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.fundTransferBuyGoodsForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: ['', [Validators.required]],
      fxReferenceId: ['', [Validators.required]],
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
    if (this.fundTransferBuyGoodsForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: 'Buy goods',
        paymentReason: this.getForm.reason.value,
        fxReferenceId: this.getForm.fxReferenceId.value,
        schedulePayment: this.paymentDate,
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
      this.loading = false;
    }
  }

  otpVerification() {
    this.router.navigate(['/transact/buy-goods/otp-verification']);
  }

  // Initiate fund transfer to buy goods.
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
      schedulePayment: this.paymentDate,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1, // Buy goods
    };
    if (this.fundTransferBuyGoodsForm.valid) {
      this.ownEquityAccountService
        .sendToOwnEquityAccount(payload)
        .subscribe((res) => {
          if (res.status) {
            this.loading = false;
            this.router.navigate(['/transact/buy-goods/otp-verification']);
          } else {
            this.loading = false;
            alert(res.message);
            // TODO:: Notify Error
          }
        });
    }
  }
}

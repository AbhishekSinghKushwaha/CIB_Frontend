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
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { BuyAirtimeService } from 'src/app/core/services/transfers/buy-airtime/buy-airtime.service';

@Component({
  selector: 'app-buy-airtime',
  templateUrl: './buy-airtime.component.html',
  styleUrls: ['./buy-airtime.component.scss']
})
export class BuyAirtimeComponent extends BaseTransactComponent implements OnInit {

  airTimeForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    private buyAirtimeService: BuyAirtimeService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly airtimeFailedService: AirtimeFailedService,
    private readonly airtimeSuccessService: AirtimeSuccessService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly ownEquityAccountService: OwnAccountService,
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
      sendFrom: [''],
      sendTo: [''],
      amount: [{}, [Validators.required]],
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
    const message = {
      title: 'Something went wrong',
      image: './assets/images/Illustrations/Illustrations_NoAccounts.svg',
      message: 'The system is unable to perform this payment task at the moment'
    }
    const payload = {
      telco: this.getForm.sendTo.value.telco.telco,
      amount: this.getForm.amount.value.amount,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
    };
    this.buyAirtimeService.getCharges(payload).subscribe((res) => {
        if (res.status) {
          this.confirmPayment(res.data);
        } else {
          this.airtimeFailedService.open(message);
        }
      },
      (err) => {
        this.airtimeFailedService.open(message);
      });
  }

  confirmPayment(transferFee: string) {
    const paymentData = {
      from: this.getForm.sendFrom.value,
      to: this.getForm.sendTo.value,
      amount: this.getForm.amount.value,
      transactionType: this.transferType.BUY_AIRTIME,
      paymentReason: this.getForm.reason.value,
      fxReferenceId: this.getForm.fxReferenceId.value,
      schedulePayment: this.getForm.schedulePayment.value,
      transferFee,
    };
    const data = {
      title: "Payment Confirmation",
      subtitle: "To continue, please confirm your transaction",
      submitButtonText: "Confirm",
      content: [
        {
          key: "Transaction",
          value: "Buy Airtime",
        },
        {
          key: "Amount",
          value: `${this.getForm.amount.value.amount} ${this.getForm.amount.value.currency}`,
        },
        {
          key: "Charges",
          value: `${transferFee} ${this.getForm.amount.value.currency}`,
        },
        {
          key: "From",
          value: `${this.getForm.sendFrom.value.accountName}<br>
            ${this.getForm.sendFrom.value.accountNumber}
          `,
        },
        {
          key: "To",
          value: `${this.getForm.sendTo.value.telco.telco} • ${this.getForm.sendTo.value.country.countryName}<br>
            ${this.getForm.sendTo.value.phoneNumber}
          `,
        },
        {
          key: "Frequency",
          value: `${this.getForm.schedulePayment.value.frequency.frequency}<br>
            ${this.getForm.schedulePayment.value.reminderDay.reminder}
          `,
        },
        {
          key: "Payment Date",
          value: `${this.getForm.schedulePayment.value.startDate}`,
        },
        
        {
          key: "FX Reference ID",
          value: `${this.getForm.fxReferenceId.value}`,
        },
        {
          key: "Payment Reason",
          value: `${this.getForm.reason.value}`,
        },
      ],
    };

    this.confirmationModalService
      .open(data)
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (data) {
          this.buyAirtime();
          this.airtimeSuccessService.airtimeSuccess(paymentData);
        }
      });
  }
  
  insufficientBalance() {
    const insufficientBalance = {
      title: 'Insufficient balance',
      image: './assets/images/Illustrations/Illustrations_NoAccounts.svg',
      message: 'You currently don’t have sufficient funds for charges and amount.'
    }
    this.airtimeFailedService.open(insufficientBalance);
  }

  // Initiate buy airtime
  buyAirtime() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.phoneNumber,
      beneficiaryBank: this.getForm.sendTo.value.telco.telco,
      beneficiaryBankCode: '54',
      beneficiaryCurrency: '',
      beneficiaryName: '',
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
      transferType: this.transferType.BUY_AIRTIME,
    };
    if (this.airTimeForm.valid) {
      this.buyAirtimeService.airtimePayload(payload);
      this.router.navigate([`/transact/otp-verification/${this.transferType.BUY_AIRTIME}`]);
    }
  }
}

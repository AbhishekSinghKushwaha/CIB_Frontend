import { Component, OnInit } from '@angular/core';
import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseTransactComponent } from "../../base-transact.component";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { StandingOrdersService } from "src/app/core/services/transfers/standing-orders/standing-orders.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { ScheduledPaymentModel, FrequencySelectionModel, ReminderSelectionModel } from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';
import { CurrencyModel, TransferAmount } from 'src/app/core/domain/transfer.models';
import { CurrencySelectionService } from 'src/app/core/services/modal-services/currency-selection.service';
import { AirtimeFailedService } from 'src/app/core/services/airtime-failed/airtime-failed.service';
import { BuyAirtimeService } from 'src/app/core/services/transfers/buy-airtime/buy-airtime.service';

@Component({
  selector: 'app-standing-orders-form',
  templateUrl: './standing-orders-form.component.html',
  styleUrls: ['./standing-orders-form.component.scss']
})
export class StandingOrdersFormComponent extends BaseTransactComponent implements OnInit {

  standingOrdersForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;
  type = "Standing Orders";
  editMode: boolean = false;
  standingOrderId: number;
  standingOrdersList: any;
  transactions: any[] = [];
  transactionConversion: string
  transactionType: string;

  public value: TransferAmount = {
    amount: 0,
    currency: '',
    isWithinLimit: true,
  };

  currency: CurrencyModel = { currencyCode: '', currencyDescription: '' };

  frequency: FrequencySelectionModel = {frequency: '',  description: '', value: 0 };
  
  reminder: ReminderSelectionModel = { reminder: '',  description: '', value: 0 };
  
  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    private standingOrdersService: StandingOrdersService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly confirmationModalService: ConfirmationModalService,
    private route: ActivatedRoute,
    private sharedDataService: SharedDataService,
    private readonly schedulePaymentService: SchedulePaymentService,
    private readonly currencySelectionService: CurrencySelectionService,
    private readonly airtimeFailedService: AirtimeFailedService,
    private readonly buyAirtimeService: BuyAirtimeService
  ) {
    super(snackbar);
    this.standingOrderId = route.snapshot.params['id'];
  }

  get getForm() {
    return this.standingOrdersForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  initForm(): void {
    this.standingOrdersForm = this.fb.group({
      transferType: ["", [Validators.required]],
      sendFrom: ["", [Validators.required]],
      sendTo: [""],
      amount: [{}, [Validators.required]],
      schedulePayment: ["", [Validators.required]],
      reason: [""],
      license: [""],
      chargeOption: [""],
      paymentCategory: [""]
    });
  }

  openSupportingDocuments(): void {
    this.supportingDocumentsUploadService.open();
  }

  populateForm() {
    if(this.standingOrderId){
      this.editMode = true;
      this.standingOrdersService.getScheduleId(this.standingOrderId).subscribe((response) => {
        this.standingOrdersList = response.data;
        
        this.standingOrdersForm.controls.transferType.setValue(
          this.setTransferType(
            this.transferType,
            response.data.transferType.toString()
          )
        );
        this.setFromAccount(this.standingOrdersList.sourceAccount);
        this.setToAccount();
        this.setAmount();
        this.schedulePayment();
      });
    }
  }

  setAmount() {
    this.value.amount = this.standingOrdersList.amount;
    this.value.currency = this.standingOrdersList.beneficiaryCurrency;

    this.currency.currencyCode = this.standingOrdersList.beneficiaryCurrency;
    this.currencySelectionService.select(this.currency);
    this.standingOrdersForm.controls.amount.setValue(this.value);
  }

  setTransferType(object: any, value: string) {
    const key = Object.keys(object).find((key) => object[key] === value);
    return { key, value };
  }

  setFromAccount(fromAccount: string) {
    this.sharedDataService.userAccounts.subscribe((x) => {
      const account = x.find((el) => {
        return (el.accountNumber = Number(fromAccount));
      });
      this.standingOrdersForm.controls.sendFrom.setValue(account || "");
    });
  }

  setToAccount() {
    const data = {
      accountName: this.standingOrdersList.beneficiaryName,
      accountNumber: this.standingOrdersList.beneficiaryAccount,
      currency: this.standingOrdersList.beneficiaryCurrency,
    };
    this.standingOrdersForm.controls.sendTo.setValue(data);
  }

  formatTransactionType() {
    this.transactionConversion = this.getForm.transferType.value.value.toString();

    switch (this.transactionConversion) {
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

  schedulePayment() {
    if(this.standingOrdersList.frequency === 1) {
      this.frequency.frequency = 'Once-off';
      this.frequency.description = 'Description';
      this.frequency.value = 1;
    }
    else if(this.standingOrdersList.frequency === 2) {
      this.frequency.frequency = 'Daily';
      this.frequency.value = 2;
    }
    else if(this.standingOrdersList.frequency === 3) {
      this.frequency.frequency = 'Weekly';
      this.frequency.value = 3;
    }
    else if(this.standingOrdersList.frequency === 4) {
      this.frequency.frequency = 'Monthly';
      this.frequency.value = 4;
    }
    else if(this.standingOrdersList.frequency === 5) {
      this.frequency.frequency = 'Quarterly';
      this.frequency.value = 5;
    }

    if(this.standingOrdersList.reminder === 0) {
      this.reminder.reminder = 'No reminder';
      this.reminder.value = 0;
    }
    else if(this.standingOrdersList.reminder === 1) {
      this.reminder.reminder = '1 day before';
      this.reminder.value = 1;
    } 
    else if(this.standingOrdersList.reminder === 2) {
      this.reminder.reminder = '2 days before';
      this.reminder.value = 2;
    }
    else if(this.standingOrdersList.reminder === 3) {
      this.reminder.reminder = '3 days before';
      this.reminder.value = 3;
    }
    else if(this.standingOrdersList.reminder === 4) {
      this.reminder.reminder = '4 days before';
      this.reminder.value = 4;
    }

    const scheduledPaymentData: ScheduledPaymentModel = {
      frequency: this.frequency,
      startDate: new Date(this.standingOrdersList.startDate),
      endDate: new Date(this.standingOrdersList.endDate),
      reminderDay: this.reminder,
    };
    this.schedulePaymentService.selectFrequency(this.frequency);
    this.schedulePaymentService.selectReminder(this.reminder);
    this.schedulePaymentService.selectScheduledPayment(scheduledPaymentData);
    this.standingOrdersForm.controls.schedulePayment.setValue(scheduledPaymentData);
  }

  getTransferCharges() {
    if(this.standingOrdersForm.controls.transferType.value.value !== this.transferType.BUY_AIRTIME) {
      const payload = {
        amount: this.getForm.amount.value.amount,
        currency: this.getForm.amount.value.currency,
        destinationAccount: this.getForm.sendTo.value.accountNumber,
        sourceAccount: this.getForm.sendFrom.value.accountNumber,
        transferType: Number(this.getForm.transferType.value.value),
      };
      this.standingOrdersService
        .getTransferCharges(payload)
        .subscribe((res) => {
          if (res.status) {
            this.confirmPayment(res.data);
          } else {
            // TODO:: Notify error
          }
      });
    }
    else if(this.standingOrdersForm.controls.transferType.value.value === this.transferType.BUY_AIRTIME){
      const message = {
        title: 'Something went wrong',
        image: './assets/images/Illustrations/Illustrations_NoAccounts.svg',
        message: 'The system is unable to perform this payment task at the moment'
      }
      const payload = {
        telco: this.getForm.sendTo.value.telco? this.getForm.sendTo.value.telco.telco : this.standingOrdersList.beneficiaryName,
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
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    this.formatTransactionType();

    const data = {
      title: "Standing order confirmation",
      subtitle: "To continue, please confirm your transaction",
      submitButtonText: "Submit",
      content: [
        {
          key: "Transaction",
          value: `${this.transactionType}`,
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
          key: "New balance",
          value: `<span>${this.getForm.sendFrom.value.balance} ${this.getForm.sendFrom.value.currency}</span>`,
        },
        {
          key: "To",
          value: `${this.getForm.sendTo.value.accountName ? this.getForm.sendTo.value.accountName : this.getForm.sendTo.value.telco.telco} 
          <br> 
          ${this.getForm.sendTo.value.accountNumber ? this.getForm.sendTo.value.accountNumber : this.getForm.sendTo.value.phoneNumber}`,
        },
        {
          key: "From",
          value: `${this.getForm.sendFrom.value.accountName}<br>
            ${this.getForm.sendFrom.value.accountNumber}
          `,
        },
      ],
    };

    this.confirmationModalService
      .open(data)
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (data) {
          this.standingOrder();
        }
      });
  }

  standingOrder() {
    const payload = {
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      sourceAccountName:this.getForm.sendFrom.value.accountName,
      sourceBankName: this.getForm.sendFrom?.value?.bankName ? this.getForm.sendFrom.value.bankName : '',
      sourceBankCode: this.getForm.sendFrom?.value?.bankCode ? this.getForm.sendFrom.value.bankCode : '54',
      sourceAccountCurrency: this.getForm.sendFrom.value.currency,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber ? this.getForm.sendTo.value.accountNumber : this.getForm.sendTo.value.phoneNumber,
      beneficiaryName: this.getForm.sendTo.value.accountName ? this.getForm.sendTo.value.accountName : this.getForm.sendTo.value.telco.telco,
      beneficiaryBank: this.getForm.sendFrom?.value?.bankName ? this.getForm.sendFrom.value.bankName : '',
      beneficiaryBankCode: this.getForm.sendFrom?.value?.bankCode ? this.getForm.sendFrom.value.bankCode : '54',
      beneficiaryCurrency: this.getForm.sendTo.value.currency ? this.getForm.sendTo.value.currency : this.getForm.amount.value.currency,
      amount: this.getForm.amount.value.amount,
      transferType: this.getForm.transferType.value.value,
      frequency: this.getForm.schedulePayment.value.frequency.value,
      startDate: this.getForm.schedulePayment.value.startDate.toISOString(),
      endDate: this.getForm.schedulePayment.value.endDate.toISOString(),
      reminderInDays: this.getForm.schedulePayment.value.reminderDay.value
    };

    const editPayload = {
      id: Number(this.standingOrderId),
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      sourceAccountName:this.getForm.sendFrom.value.accountName,
      sourceBankName: this.getForm.sendFrom?.value?.bankName ? this.getForm.sendFrom.value.bankName : '',
      sourceBankCode: this.getForm.sendFrom?.value?.bankCode ? this.getForm.sendFrom.value.bankCode : '54',
      sourceAccountCurrency: this.getForm.sendFrom.value.currency,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber ? this.getForm.sendTo.value.accountNumber : this.getForm.sendTo.value.phoneNumber,
      beneficiaryName: this.getForm.sendTo.value.accountName ? this.getForm.sendTo.value.accountName : this.getForm.sendTo.value.telco.telco,
      beneficiaryBank: this.getForm.sendFrom?.value?.bankName ? this.getForm.sendFrom.value.bankName : '',
      beneficiaryBankCode: this.getForm.sendFrom?.value?.bankCode ? this.getForm.sendFrom.value.bankCode : '54',
      beneficiaryCurrency: this.getForm.sendTo.value.currency ? this.getForm.sendTo.value.currency : this.getForm.amount.value.currency,
      amount: this.getForm.amount.value.amount,
      transferType: this.getForm.transferType.value.value,
      frequency: this.getForm.schedulePayment.value.frequency.value,
      startDate: this.getForm.schedulePayment.value.startDate.toISOString(),
      endDate: this.getForm.schedulePayment.value.endDate.toISOString(),
      reminderInDays: this.getForm.schedulePayment.value.reminderDay.value
    };

    if (this.standingOrdersForm.valid) {
      this.editMode ? 
      this.standingOrdersService.editStandingOrder(editPayload).subscribe(
        (res) => {
          if (res.status) {
            this.router.navigate([`/transact/otp-verification/${this.type}`]);
          } else {
            // TODO:: Notify Error
          }
        },
        (err) => {
          alert(
            `Sorry, we're unable to complete your transaction. Please give us some time to fix the problem and try again later.`
          );
        }
      ) :
      this.standingOrdersService.createStandingOrder(payload).subscribe(
        (res) => {
          if (res.status) {
            this.router.navigate([`/transact/otp-verification/${this.type}`]);
          } else {
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

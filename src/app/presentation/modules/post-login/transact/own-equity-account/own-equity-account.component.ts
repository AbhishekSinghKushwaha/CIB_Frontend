import { Component, OnDestroy, OnInit } from "@angular/core";

import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseTransactComponent } from "../base-transact.component";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { UniversalValidators } from "ngx-validators";
import { OwnAccountService } from "src/app/core/services/transfers/own-account/own-account.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { Observable, of, Subscription } from "rxjs";
import { TransactionListmodel } from "src/app/core/domain/transaction-list.model";
import {
  CurrencyModel,
  EditTransaction,
  TransferAmount,
} from "src/app/core/domain/transfer.models";
import { SharedUtils } from "src/app/core/utils/shared.util";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import {
  FrequencySelectionModel,
  ReminderSelectionModel,
  ScheduledPaymentModel,
} from "src/app/core/domain/scheduled-payment.model";
import { CurrencySelectionService } from "src/app/core/services/modal-services/currency-selection.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";
import { SchedulePaymentService } from "src/app/core/services/schedule-payment/schedule-payment.service";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";

@Component({
  selector: "app-own-equity-account",
  templateUrl: "./own-equity-account.component.html",
  styleUrls: ["./own-equity-account.component.scss"],
})
export class OwnEquityAccountComponent
  extends BaseTransactComponent
  implements OnInit, OnDestroy
{
  ownEquityAccountTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;

  subscriptions: Subscription[] = [];

  editMode: boolean = false;
  transactionRefernce: string;

  constants = TransactionTypeConstants;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router,
    private transactionsService: TransactionsService,
    private sharedDataService: SharedDataService,
    private currencySelectionService: CurrencySelectionService,
    private storageService: StorageService,
    private transferFromService: TransferFromService,
    private schedulePaymentService: SchedulePaymentService,
    private confirmModalService: ConfirmationModalService
  ) {
    super(snackbar);
  }

  get getForm() {
    return this.ownEquityAccountTransferForm.controls;
  }
  async ngOnInit() {
    this.initForm();

    this.test();

    this.subscriptions.push(
      this.transactionsService.transaction$.subscribe(
        (res: TransactionListmodel) => {
          this.transactionsService.configureEditData(res);
          if (Object.keys(res).length > 0) {
            this.editMode = true;
            this.transactionRefernce = res.requestReference || "";
            this.setSendTo(res);
            this.setSendFrom(res);
            this.setAmount(res);
            this.setSchedulePayment(res);
            this.getForm.fxReferenceId.patchValue(res.fxReferenceID);
            this.getForm.reason.patchValue(res.paymentReason);
          }
        }
      )
    );
  }

  async test() {
    console.log(await this.sharedDataService.userAccounts$.toPromise());
  }

  ngOnDestroy(): void {
    SharedUtils.unSubscribe(this.subscriptions);
  }

  initForm(): void {
    this.ownEquityAccountTransferForm = this.fb.group({
      sendFrom: ["", [Validators.required]],
      sendTo: [""],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [""],
      fxReferenceId: ["", [Validators.required]],
      schedulePayment: ["", [Validators.required]],
    });
  }

  openSupportingDocuments(): void {
    this.supportingDocumentsUploadService.open();
  }

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: Number(this.transferType.OWN_EQUITY),
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
    const data = {
      title: "Payment Confirmation",
      subtitle: "To continue, please confirm your transaction",
      submitButtonText: "Confirm",
      content: [
        {
          key: "Transaction",
          value: `Send to own equity account`,
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
          value: `${this.getForm.sendTo.value.accountName}<br>
            ${this.getForm.sendFrom.value.accountNumber}
          `,
        },
        {
          key: "Payment Date",
          value: `${this.getForm.schedulePayment.value.startDate}`,
        },
        {
          key: "Frequency",
          value: `${this.getForm.schedulePayment.value.frequency.frequency}<br>
            ${this.getForm.schedulePayment.value.reminderDay.reminder}
          `,
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

    this.confirmModalService
      .open(data)
      .afterClosed()
      .subscribe((confirmed: boolean) => {
        if (data) {
          this.savePayloadForOtpVerification();
        }
      });
  }

  // Initiate fund transfer to own equity account
  savePayloadForOtpVerification() {
    console.log(this.ownEquityAccountTransferForm.getRawValue());
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: "",
      beneficiaryBankCode: "",
      beneficiaryCurrency: this.getForm.sendTo.value.currency,
      beneficiaryName: this.getForm.sendTo.value.accountName,
      currency: this.getForm.amount.value.currency,
      fxReferenceId: this.getForm.fxReferenceId.value,
      paymentReason: this.getForm.reason.value,
      schedulePayment: {
        frequency: this.getForm.schedulePayment.value.frequency.value,
        reminderDay: this.getForm.schedulePayment.value.reminderDay.value,
        startDate: this.getForm.schedulePayment.value.startDate,
        endDate: this.getForm.schedulePayment.value.endDate,
      },
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: this.transferType.OWN_EQUITY,
    };
    if (this.ownEquityAccountTransferForm.valid) {
      if (this.editMode) {
        this.transactionsService.setReinitiatePayload({
          requestReference: this.transactionRefernce,
          ...payload,
        });
        this.router.navigate([
          `/transact/otp-verification/reinitiate-transaction`,
        ]);
      } else {
        this.ownEquityAccountService.setTransferPayload(payload);
        this.router.navigate([
          `/transact/otp-verification/${this.transferType.OWN_EQUITY}`,
        ]);
      }
    }
  }

  setSendFrom(data: TransactionListmodel) {
    this.subscriptions.push(
      this.sharedDataService.userAccounts$.subscribe((accounts) => {
        const account = accounts.find(
          (value) => value.accountNumber === data.sourceAccount
        );

        this.ownEquityAccountTransferForm.controls.sendFrom.setValue(account);

        this.transferFromService.setTransferFromAccount(
          this.getForm.sendFrom.value
        );
      })
    );
  }

  setSendTo(data: TransactionListmodel) {
    this.subscriptions.push(
      this.sharedDataService.userAccounts$.subscribe((accounts) => {
        const account = accounts.find(
          (value) => value.accountNumber === data.beneficiaryAccount
        );
        this.ownEquityAccountTransferForm.controls.sendTo.setValue(account);
      })
    );
  }

  setSchedulePayment(data: TransactionListmodel) {
    const frequency = this.constants.FrequencyListings.find(
      (value: FrequencySelectionModel) =>
        value.value === data.scheduledPayment?.frequency
    );

    const reminderDay = this.constants.ReminderListings.find(
      (value: ReminderSelectionModel) =>
        value.value === data.scheduledPayment?.reminderDay
    );

    const schedulePaymentData: ScheduledPaymentModel = {
      startDate: data.scheduledPayment?.startDate,
      reminderDay: reminderDay || {},
      endDate: data.scheduledPayment?.endDate,
      frequency: frequency || {},
    };
    this.schedulePaymentService.setScheduledPayment(schedulePaymentData);
  }

  async setAmount(res: TransactionListmodel) {
    const amount: TransferAmount = {
      amount: res.amount || 0,
      currency: res.currency || "",
      isWithinLimit: true,
    };

    const currency = await this.storageService
      .getData("currencies")
      .find((value: CurrencyModel) => value.currencyCode === res.currency);
    currency ?? this.currencySelectionService.select(currency);
    this.getForm.amount.patchValue(amount);
  }
}

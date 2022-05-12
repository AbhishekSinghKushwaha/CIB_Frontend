import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ScheduledPaymentModel } from "src/app/core/domain/scheduled-payment.model";
import { TransactionListmodel } from "src/app/core/domain/transaction-list.model";
import {
  CurrencyModel,
  TransferAmount,
} from "src/app/core/domain/transfer.models";
import { AccountsService } from "src/app/core/services/accounts/accounts.service";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { CurrencySelectionService } from "src/app/core/services/modal-services/currency-selection.service";
import { TransferFromService } from "src/app/core/services/modal-services/transfer-from.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { IntrabankService } from "src/app/core/services/transfers/intrabank/intrabank.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import SharedUtils from "src/app/core/utils/shared.util";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { BaseTransactComponent } from "../base-transact.component";
@Component({
  selector: "app-other-equity-account",
  templateUrl: "./other-equity-account.component.html",
  styleUrls: ["./other-equity-account.component.scss"],
})
export class OtherEquityAccountComponent
  extends BaseTransactComponent
  implements OnInit, OnDestroy
{
  intraBankTransferForm: FormGroup;
  paymentDate: ScheduledPaymentModel;
  schedulePaymentData: ScheduledPaymentModel;

  transferType = TransactionTypeConstants.TransferType;
  get getForm() {
    return this.intraBankTransferForm.controls;
  }

  subscriptions: Subscription[] = [];

  constructor(
    snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private intraBankTransferService: IntrabankService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService,
    private storageService: StorageService,
    private transactionsService: TransactionsService,
    private currencySelectionService: CurrencySelectionService,
    private sharedDataService: SharedDataService,
    private transferFromService: TransferFromService
  ) {
    super(snackBar);
  }

  ngOnInit(): void {
    this.initForm();

    this.subscriptions.push(
      this.transactionsService.transaction$.subscribe(
        (res: TransactionListmodel) => {
          console.log(res);
          if (Object.keys(res).length > 0) {
            this.setSendTo(res);
            this.setSendFrom(res);
            this.setAmount(res);
            this.getForm.fxReferenceId.patchValue(res.fxReferenceID);
            this.getForm.reason.patchValue(res.paymentReason);
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    SharedUtils.unSubscribe(this.subscriptions);
  }

  private initForm(): void {
    this.intraBankTransferForm = this.fb.group({
      sendFrom: ["", [Validators.required]],
      sendTo: ["", [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [""],
      fxReferenceId: [""],
      schedulePayment: ["", [Validators.required]],
    });
  }

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: Number(this.transferType.INTRA_BANK), // For Own Equity Account
    };
    this.intraBankTransferService
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
  confirmPayment(transferFee: number) {
    if (this.intraBankTransferForm.valid) {
      const data = {
        title: "Payment Confirmation",
        subtitle: "To continue, please confirm your transaction",
        submitButtonText: "Confirm",
        content: [
          {
            key: "Transaction",
            value: "Send money to an equity account",
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
            ${this.getForm.sendTo.value.accountNumber}
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
            this.savePayloadForOtpVerification();
          }
        });
    }
  }

  // Initiate fund transfer to another equity account
  savePayloadForOtpVerification() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: "",
      beneficiaryBankCode: "54", // TODO:: Needs some more analysis. Bank Code is required in the intrabank journey
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
      transferType: this.transferType.INTRA_BANK,
    };

    if (this.intraBankTransferForm.valid) {
      this.intraBankTransferService.setTransferPayload(payload);
      this.router.navigate([
        `/transact/otp-verification/${this.transferType.INTRA_BANK}`,
      ]);
    }
  }

  setSendFrom(data: TransactionListmodel) {
    this.subscriptions.push(
      this.sharedDataService.userAccounts$.subscribe((accounts) => {
        const account = accounts.find(
          (value) => value.accountNumber === data.sourceAccount
        );

        this.intraBankTransferForm.controls.sendFrom.setValue(account);

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
        this.intraBankTransferForm.controls.sendTo.setValue(account);
      })
    );
  }

  setSchedulePayment(data: TransactionListmodel) {
    // const schedulePayment: ScheduledPaymentModel = {
    //   frequency: '',
    //   startDate: '',
    //   endDate: '',
    //   reminderDay: ''
    // }
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

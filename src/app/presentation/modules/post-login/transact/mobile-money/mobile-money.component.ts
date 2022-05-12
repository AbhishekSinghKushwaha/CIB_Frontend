import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { TransactionsService } from "src/app/core/services/transactions/transactions.service";
import { MobileMoneyService } from "src/app/core/services/transfers/mobile-money/mobile-money.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";

@Component({
  selector: "app-mobile-money",
  templateUrl: "./mobile-money.component.html",
  styleUrls: ["./mobile-money.component.scss"],
})
export class MobileMoneyComponent implements OnInit, OnDestroy {
  mobileMoneyTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;

  get getForm() {
    return this.mobileMoneyTransferForm.controls;
  }

  editSubscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private dialog: MatDialog,
    private readonly router: Router,
    private readonly mobileMoneyTransferService: MobileMoneyService,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.editSubscription = this.transactionsService.transaction$.subscribe(
      (res) => {
        console.log(res);
      }
    );
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  initForm() {
    this.mobileMoneyTransferForm = this.fb.group({
      sendFrom: ["", [Validators.required]],
      sendTo: [""],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [""],
      fxReferenceId: ["", [Validators.required]],
      schedulePayment: ["", [Validators.required]],
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
      destinationAccount: this.getForm.sendTo.value.phoneNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      destinationBankCode: this.getForm.sendTo.value.mobileWallet.wallet,
      transferType: Number(this.transferType.MOBILE_MONEY),
      fxReferenceId: this.getForm.fxReferenceId.value,
      countryCode: "KE", //TODO:: Default have it as kenya, then change to pick the user's country
    };
    this.mobileMoneyTransferService
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
          value: `Send to mobile wallet via ${this.getForm.sendTo.value.mobileWallet?.walletDescription}`,
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
            ${this.getForm.sendTo.value.phoneNumber}<br>
            ${this.getForm.sendTo.value.mobileWallet?.walletDescription}
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

    this.confirmationModalService
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
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.phoneNumber,
      beneficiaryBank: this.getForm.sendTo.value.mobileWallet?.wallet,
      beneficiaryBankCode: this.getForm.sendTo.value.mobileWallet?.wallet,
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
      transferType: Number(this.transferType.MOBILE_MONEY),
    };
    if (this.mobileMoneyTransferForm.valid) {
      this.mobileMoneyTransferService.setTransferPayload(payload);
      this.mobileMoneyTransferService.setFavouritesPayload(
        this.mobileMoneyTransferForm.getRawValue()
      );
      this.router.navigate([
        `/transact/otp-verification/${this.transferType.MOBILE_MONEY}`,
      ]);
    }
  }
}

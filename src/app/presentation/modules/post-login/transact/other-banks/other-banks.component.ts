import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { InterbankService } from "src/app/core/services/transfers/interbank/interbank.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";

@Component({
  selector: "app-other-banks",
  templateUrl: "./other-banks.component.html",
  styleUrls: ["./other-banks.component.scss"],
})
export class OtherBanksComponent implements OnInit {
  interBankTransferForm: FormGroup;
  transferType = TransactionTypeConstants.TransferType;
  get getForm() {
    return this.interBankTransferForm.controls;
  }
  currentUser: any;
  constructor(
    private readonly fb: FormBuilder,
    private interBankTransferService: InterbankService,
    private dialog: MatDialog,
    private router: Router,
    private confirmationModalService: ConfirmationModalService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.currentUser = this.storageService.getData("currentUserData");
    this.getForm.transactionType.patchValue(this.transferType.RTGS);
  }

  initForm() {
    this.interBankTransferForm = this.fb.group({
      transactionType: ["", [Validators.required]],
      sendFrom: ["", [Validators.required]],
      sendTo: ["", Validators.required],
      amount: [{}, [Validators.required, accountLimitValidator]],
      fxReferenceId: [""],
      schedulePayment: ["", [Validators.required]],
      reason: [""],
    });
  }

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      destinationBankCode: this.getForm.sendTo.value.bank.bankCode,
      destinationCountryCode: this.currentUser.countryId,
      countryCode: this.currentUser.countryId,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: this.getForm.transactionType.value, // For Another Bank Transfer Type
    };
    this.interBankTransferService
      .getTransferCharges(payload)
      .subscribe((res) => {
        if (res.status) {
          this.confirmPayment(res.data);
        } else {
          console.log(res.message);
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
          value:
            this.getForm.transactionType.value === this.transferType.EFT
              ? "Send money to other banks via EFT"
              : "Send money to other banks via RTGS",
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
          value: `${this.getForm.sendTo.value.accountName} <br>
            ${this.getForm.sendTo.value.accountNumber} <br>
            ${this.getForm.sendTo.value.bank?.bankName}
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

  // Initiate fund transfer to own equity account
  savePayloadForOtpVerification() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: this.getForm.sendTo.value.bank.bankName,
      beneficiaryBankCode: this.getForm.sendTo.value.bank.bankCode,
      beneficiaryCurrency: this.getForm.amount.value.currency,
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
      transferType: Number(this.getForm.transactionType.value), // RTGS or EFT
    };
    if (this.interBankTransferForm.valid) {
      this.interBankTransferService.setTransferPayload(payload);
      this.interBankTransferService.setFavouritesPayload(
        this.interBankTransferForm.getRawValue()
      );
      this.router.navigate([
        `/transact/otp-verification/${this.getForm.transactionType.value}`,
      ]);
    }
  }
}

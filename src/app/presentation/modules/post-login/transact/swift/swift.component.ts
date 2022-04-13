import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { SwiftTransferService } from "src/app/core/services/transfers/swift/swift-transfer.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";

@Component({
  selector: "app-swift",
  templateUrl: "./swift.component.html",
  styleUrls: ["./swift.component.scss"],
})
export class SwiftComponent implements OnInit {
  swiftTransferForm: FormGroup;

  transferType = TransactionTypeConstants.TransferType;

  get getForm() {
    return this.swiftTransferForm.controls;
  }
  userCountry = "KE";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly swiftTransferService: SwiftTransferService,
    private confirmationModalService: ConfirmationModalService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.swiftTransferForm = this.fb.group({
      sendFrom: ["", [Validators.required]],
      sendTo: ["", [Validators.required]],
      fxReferenceId: ["", [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      schedulePayment: ["", [Validators.required]],
      license: ["", [Validators.required]],
      chargeOption: ["", [Validators.required]],
      paymentCategory: [
        "",
        [
          this.userCountry === "CD"
            ? Validators.required
            : Validators.nullValidator,
        ],
      ],
      reason: [""],
    });
  }

  getTransferCharges() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      destinationBankCode: this.getForm.sendTo.value.bank.bic,
      destinationCountryCode: this.getForm.sendTo.value.country.countryCode,
      countryCode: "KE", //TODO:: Default have it as kenya, then change to pick the user's country
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: this.transferType.SWIFT, // For Another Bank Transfer Type
    };
    this.swiftTransferService.getTransferCharges(payload).subscribe((res) => {
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
          value: "Send to another bank via SWIFT",
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
          value: `${this.getForm.sendTo.value.firstName} ${this.getForm.sendTo.value.lastName}<br>
            <span><strong>Bank:</strong></span> ${this.getForm.sendTo.value.bank.bankName}<br>
            <span><strong>Ac/No:</strong></span> ${this.getForm.sendTo.value.accountNumber}<br>
            <span><strong>SWIFT Code:</strong></span>  ${this.getForm.sendTo.value.bank.bic}<br>
            ${this.getForm.sendTo.value.country.countryName}
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
          key: "IBAN Number",
          value: `${this.getForm.sendTo.value.IBANNumber}`,
        },
        {
          key: "Payment Category",
          value: `${this.getForm.paymentCategory.value.name}`,
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
      beneficiaryBankCode: this.getForm.sendTo.value.bank.bic,
      beneficiaryCurrency: this.getForm.sendTo.value.country.currency,
      beneficiaryName: `${this.getForm.sendTo.value.firstName} ${this.getForm.sendTo.value.lastName}`,
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
      transferType: Number(this.transferType.SWIFT), // SWIFT
      physicalAddress: this.getForm.sendTo.value.streetAddress,
      chargeOption: this.getForm.chargeOption.value.charge,
      beneficiaryBankBranchCode: this.getForm.sendTo.value.bank.branchCode,
      sectorCode: this.getForm.paymentCategory.value.sectorCode,
    };
    if (this.swiftTransferForm.valid) {
      this.swiftTransferService.setTransferPayload(payload);
      this.swiftTransferService.setFavouritesPayload(
        this.swiftTransferForm.getRawValue()
      );
      this.router.navigate([
        `/transact/otp-verification/${this.transferType.SWIFT}`,
      ]);
    }
  }
}

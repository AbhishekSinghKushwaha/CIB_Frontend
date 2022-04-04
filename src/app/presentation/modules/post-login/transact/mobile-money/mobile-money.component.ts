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
  selector: "app-mobile-money",
  templateUrl: "./mobile-money.component.html",
  styleUrls: ["./mobile-money.component.scss"],
})
export class MobileMoneyComponent implements OnInit {
  mobileMoneyTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;

  get getForm() {
    return this.mobileMoneyTransferForm.controls;
  }

  constructor(
    private readonly fb: FormBuilder,
    private dialog: MatDialog,
    private readonly router: Router,
    private readonly swiftTransferService: SwiftTransferService,
    private readonly confirmationModalService: ConfirmationModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
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
          this.sendMoney();
        }
      });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPaymentMain(transferFee: string) {
    if (this.mobileMoneyTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: this.transferType.MOBILE_MONEY,
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
          this.sendMoney();
        }
      });
    } else {
    }
  }

  // Initiate fund transfer to own equity account
  sendMoney() {
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
      this.swiftTransferService.sendViaSwift(payload).subscribe((res) => {
        if (res.status) {
          this.router.navigate(["/transact/transfer-submitted"]);
        } else {
          alert(res.message);
          // TODO:: Notify Error
        }
      });
    }
  }
}

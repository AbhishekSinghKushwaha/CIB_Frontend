import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ScheduledPaymentModel } from "src/app/core/domain/scheduled-payment.model";
import { AccountsService } from "src/app/core/services/accounts/accounts.service";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";
import { IntrabankService } from "src/app/core/services/transfers/intrabank/intrabank.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
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
  implements OnInit
{
  intraBankTransferForm: FormGroup;
  paymentDate: ScheduledPaymentModel;
  schedulePaymentData: ScheduledPaymentModel;

  transferType = TransactionTypeConstants.TransferType;
  get getForm() {
    return this.intraBankTransferForm.controls;
  }

  constructor(
    snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private intraBankTransferService: IntrabankService,
    private router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {
    super(snackBar);
  }

  ngOnInit(): void {
    this.initForm();
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
      transferType: 1, // For Own Equity Account
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
}

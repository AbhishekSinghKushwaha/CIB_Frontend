import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { AccountsService } from "src/app/core/services/accounts/accounts.service";
import { OwnAccountService } from "src/app/core/services/transfers/own-account/own-account.service";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { BaseTransactComponent } from "../../transact/base-transact.component";
import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { IntercountryService } from "src/app/core/services/transfers/intercountry/intercountry.service";
import { ConfirmationModalService } from "src/app/core/services/modal-services/confirmation-modal.service";

@Component({
  selector: "app-intercountry-fund-transfer",
  templateUrl: "./intercountry-fund-transfer.component.html",
  styleUrls: ["./intercountry-fund-transfer.component.scss"],
})
export class IntercountryFundTransferComponent
  extends BaseTransactComponent
  implements OnInit
{
  intercountryFundTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackbar: MatSnackBar,
    private intercountryService: IntercountryService,
    public dialog: MatDialog,
    private readonly router: Router,
    private confirmationModalService: ConfirmationModalService
  ) {
    super(snackbar);
  }

  get getForm() {
    return this.intercountryFundTransferForm.controls;
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.intercountryFundTransferForm = this.fb.group({
      sendFrom: ["", [Validators.required]],
      sendTo: ["", [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: [""],
      fxReferenceId: [""],
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
      transferType: this.transferType.SUBSIDIARY,
    };
    this.intercountryService.getTransferCharges(payload).subscribe((res) => {
      if (res.status) {
        this.confirmPayment(res.data);
      } else {
        console.log(res.message);
      }
    });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    if (this.intercountryFundTransferForm.valid) {
      const data = {
        title: "Payment Confirmation",
        subtitle: "To continue, please confirm your transaction",
        submitButtonText: "Confirm",
        content: [
          {
            key: "Transaction",
            value: "Send money to an equity account in another country",
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
            ${this.getForm.sendTo.value.accountNumber} <br>
            ${this.getForm.sendTo.value.country?.countryName}
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

  // Initiate fund transfer to own equity account
  savePayloadForOtpVerification() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: "",
      beneficiaryBankCode: "54",
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
      transferType: this.transferType.SUBSIDIARY,
    };
    if (this.intercountryFundTransferForm.valid) {
      this.intercountryService.setTransferPayload(payload);
      this.intercountryService.setFavouritesPayload(
        this.intercountryFundTransferForm.getRawValue()
      );
      this.router.navigate([
        `/transact/otp-verification/${this.transferType.SUBSIDIARY}`,
      ]);
    }
  }
}

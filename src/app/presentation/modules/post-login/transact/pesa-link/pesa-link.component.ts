import { Component, OnInit } from "@angular/core";
import { SupportingDocumentsUploadService } from "src/app/core/services/supporting-documents-upload/supporting-documents-upload.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseTransactComponent } from "../base-transact.component";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { UniversalValidators } from "ngx-validators";
import { OwnAccountService } from "src/app/core/services/transfers/own-account/own-account.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { Router } from "@angular/router";
import { mockData } from "src/app/core/utils/constants/mockdata.constants";
import { FavouriteBeneficiaryModel } from "src/app/core/domain/favourites-beneficiary.model";
import { phoneLinkedModel } from "src/app/core/domain/phone-linked.modal";

import { recipientBankDetailsModel } from "src/app/core/domain/recepient-bank-details.model";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";

@Component({
  selector: "app-pesa-link",
  templateUrl: "./pesa-link.component.html",
  styleUrls: ["./pesa-link.component.scss"],
})
export class PesaLinkComponent implements OnInit {
  pesalinkTransferForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  loading: boolean = false;
  sendTo: FavouriteBeneficiaryModel;
  phoneLinked: phoneLinkedModel;
  recepientBankDetails: recipientBankDetailsModel;

  transferType = TransactionTypeConstants.TransferType;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    private ownEquityAccountService: OwnAccountService,
    public dialog: MatDialog,
    private readonly router: Router // private readonly pesaLinkSendToService: PesaLinkSendToService, // private readonly favouritesModalService: FavouritesModalService,
  ) {}

  get getForm() {
    return this.pesalinkTransferForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    // this.favouritesModalService.selected.subscribe((response) => {
    //   this.pesalinkTransferForm.controls.sendTo.setValue(response.name);
    //   this.sendTo = response;
    // });
    // this.phoneLinkedService.data.subscribe((response) => {
    //   this.pesalinkTransferForm.controls.sendTo.setValue(response.phone);
    //   this.phoneLinked = response;
    // });
    // this.recepientBankService.data.subscribe((response) => {
    //   this.pesalinkTransferForm.controls.sendTo.setValue(response.accountno);
    //   this.recepientBankDetails = response;
    // });
  }

  initForm(): void {
    this.pesalinkTransferForm = this.fb.group({
      sendFrom: ["", [Validators.required]],
      sendTo: ["", [Validators.required]],
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
    this.loading = true;
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.recipient.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1, // For Own Equity Account
    };
    this.ownEquityAccountService
      .getTransferCharges(payload)
      .subscribe((res) => {
        if (res.status) {
          this.loading = false;
          this.confirmPayment(res.data);
        } else {
          this.loading = false;
          console.log(res.message);
        }
      });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    if (this.pesalinkTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: "Send to your own Equity account",
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
      this.loading = false;
    }
  }

  openFavourites(): void {
    // this.pesaLinkSendToService.open(mockData.favourites);
  }

  // Initiate fund transfer to own equity account
  sendMoney() {
    this.router.navigate(["/transact/transfer-submitted"]);
    // this.loading = true;
    // const payload = {
    //   amount: this.getForm.amount.value.amount,
    //   beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
    //   beneficiaryBank: '',
    //   beneficiaryBankCode: '',
    //   // beneficiaryCurrency: this.getForm.sendTo.value.currency,
    //   // beneficiaryName: this.getForm.sendTo.value.accountName,
    //   currency: this.getForm.amount.value.currency,
    //   fxReferenceId: this.getForm.fxReferenceId.value,
    //   paymentReason: this.getForm.reason.value,
    //   schedulePayment: {
    //     frequency: this.getForm.schedulePayment.value.frequency.value,
    //     reminderDay: this.getForm.schedulePayment.value.reminder.value,
    //     startDate: this.getForm.schedulePayment.value.startDate.toISOString(),
    //     endDate: this.getForm.schedulePayment.value.endDate.toISOString(),
    //   },
    //   sourceAccount: this.getForm.sendFrom.value.accountNumber,
    //   transferType: 1, // Own Equity Account
    // };
    // if (this.ownEquityAccountTransferForm.valid) {
    //   this.ownEquityAccountService
    //     .sendToOwnEquityAccount(payload)
    //     .subscribe((res) => {
    //       if (res.status) {
    //         this.loading = false;
    //         this.router.navigate([
    //           '/transact/other-equity-account/submit-transfer',
    //         ]);
    //       } else {
    //         this.loading = false;
    //         alert(res.message);
    //         // TODO:: Notify Error
    //       }
    //     });
    // }
  }
}

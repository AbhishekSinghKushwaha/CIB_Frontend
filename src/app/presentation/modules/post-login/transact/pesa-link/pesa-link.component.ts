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
import { PesalinkService } from "src/app/core/services/transfers/pesalink/pesalink.service";

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
    private pesalinkService: PesalinkService,
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
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: '1',
    };
    this.pesalinkService
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
    if (this.pesalinkTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: this.transferType.PESALINK,
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

  // Initiate fund transfer to own equity account
  sendMoney() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: this.getForm.sendTo.value.bank.bankName,
      beneficiaryBankCode: this.getForm.sendTo.value.bank.bankCode,
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
      transferType: '1',
    };
    if (this.pesalinkTransferForm.valid) {
      this.pesalinkService.sendViaPesalink(payload).subscribe(
        (res) => {
          if (res.status) {
            this.router.navigate([
              '/transact/transfer-submitted',
            ]);
          } else {
            console.log(res.message);
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

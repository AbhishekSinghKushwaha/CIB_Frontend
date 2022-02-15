import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
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
  constructor(
    private readonly fb: FormBuilder,
    private interBankTransferService: InterbankService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getForm.transactionType.patchValue(this.transferType.RTGS);
  }

  initForm() {
    this.interBankTransferForm = this.fb.group({
      transactionType: ["", [Validators.required]],
      sendFrom: ["", [Validators.required]],
      sendTo: ["", Validators.required],
      amount: [{}, [Validators.required, accountLimitValidator]],
      fxReferenceId: ["", [Validators.required]],
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
      destinationCountryCode: "KE", // Default have it as kenya, then change to pick the user's country
      countryCode: "KE", //TODO:: Default have it as kenya, then change to pick the user's country
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: this.getForm.transactionType.value, // For Another Bank Transfer Type
    };
    this.interBankTransferService
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
    if (this.interBankTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: Number(this.getForm.transactionType.value),
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
    console.log(payload);
    if (this.interBankTransferForm.valid) {
      this.interBankTransferService
        .sendToOtherBanks(payload)
        .subscribe((res) => {
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

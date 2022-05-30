import { Component, OnInit } from "@angular/core";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BaseTransactComponent } from "../base-transact.component";
import { accountLimitValidator } from "src/app/core/utils/validators/limits.validators";
import { UniversalValidators } from "ngx-validators";
import { OwnAccountService } from "src/app/core/services/transfers/own-account/own-account.service";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmPaymentComponent } from "src/app/presentation/shared/modals/confirm-payment/confirm-payment.component";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TransactionTypeConstants } from "src/app/core/utils/constants/transaction-type.constants";
import { BuyGoodsService } from "src/app/core/services/transfers/buy-goods/buy-goods.service";
import { MerchantDetailsService } from "src/app/core/services/merchant-details/merchant-details.service";

@Component({
  selector: "app-buy-goods",
  templateUrl: "./buy-goods.component.html",
  styleUrls: ["./buy-goods.component.scss"],
})
export class BuyGoodsComponent extends BaseTransactComponent implements OnInit {
  buyGoodsForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  transferType = TransactionTypeConstants.TransferType;
  constructor(
    private readonly fb: FormBuilder,
    snackBar: MatSnackBar,
    private buyGoodsService: BuyGoodsService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly merchantDetailsService: MerchantDetailsService
  ) {
    super(snackBar);
  }

  get getForm() {
    return this.buyGoodsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.buyGoodsForm = this.fb.group({
      sendFrom: ["", [Validators.required]],
      sendTo: ["", [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: ["", [Validators.required]],
      fxReferenceId: ["", [Validators.required]],
      schedulePayment: ["", [Validators.required]],
    });
  }

  openSupportingDocuments(): void {}

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    this.buyGoodsService.getCharges().subscribe((res) => {
      if (res.status) {
        this.confirmPayment(res.data.charge);
      } else {
        console.log(res.message);
      }
    });
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    if (this.buyGoodsForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: this.transferType.BUY_GOODS,
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
          this.buyGoods();
        }
      });
    } else {
    }
  }

  // Initiate fund transfer to buy goods.
  buyGoods() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: "",
      beneficiaryBankCode: "",
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
      transferType: this.transferType.BUY_GOODS,
    };
    const tillNumber = {
      tillNumber: this.getForm.sendTo.value.tillNumber,
    };
    if (this.buyGoodsForm.valid) {
      this.buyGoodsService.getTillNumber(tillNumber);
      this.buyGoodsService.payBuyGoods(payload);
      this.router.navigate([
        `/transact/otp-verification/${this.transferType.BUY_GOODS}`,
      ]);
    }
  }
}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SelectAccountModel } from 'src/app/core/domain/select-account.model';
import { CurrencySelectionModal } from 'src/app/core/domain/currency-selection.model';
import { SelectAccountModalService } from 'src/app/core/services/select-account-modal/select-account-modal.service';
import { SelectAccountSendtoService } from 'src/app/core/services/select-account-sendto/select-account-sendto.service';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';
import { CurrencySelectionService } from 'src/app/core/services/currency-selection/currency-selection.service';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SupportingDocumentsUploadService } from 'src/app/core/services/supporting-documents-upload/supporting-documents-upload.service';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BaseTransactComponent } from '../base-transact.component';
import { AccountsService } from 'src/app/core/services/accounts/accounts.service';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { UniversalValidators } from 'ngx-validators';
import { OwnAccountService } from 'src/app/core/services/transfers/own-account/own-account.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';
import { BuyGoodsPayToService } from 'src/app/core/services/buy-goods-pay-to/buy-goods-pay-to.service';

@Component({
  selector: 'app-buy-goods',
  templateUrl: './buy-goods.component.html',
  styleUrls: ['./buy-goods.component.scss'],
})
export class BuyGoodsComponent extends BaseTransactComponent implements OnInit {
  fundTransferBuyGoodsForm: FormGroup;
  aboveTransactionTypeLimit: boolean = false;
  loading: boolean = false;

  constructor(
    private readonly supportingDocumentsUploadService: SupportingDocumentsUploadService,
    private readonly fb: FormBuilder,
    snackBar: MatSnackBar,
    private buyGoodsService: BuyGoodsService,
    public dialog: MatDialog,
    private readonly router: Router,
    private readonly buyGoodsPayToService: BuyGoodsPayToService
  ) {
    super(snackBar);
  }

  get getForm() {
    return this.fundTransferBuyGoodsForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.buyGoodsPayToService.getMerchants();
    this.buyGoodsPayToService.getFavouriteMerchants();
  }

  initForm(): void {
    this.fundTransferBuyGoodsForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      reason: ['', [Validators.required]],
      fxReferenceId: ['', [Validators.required]],
      schedulePayment: ['', [Validators.required]],
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
      transferType: 1, // For Own Equity Account
    };
    this.buyGoodsService.getTransferCharges(payload).subscribe(res => {
      if (res.status) {
        this.loading = false;
        this.confirmPayment(res.data);
      } else {
        this.loading = false;
        // TODO:: Notify error
      }
    })
  }

  // Confirm Payment and return the confirmation boolean before initiating payment.
  confirmPayment(transferFee: string) {
    if (this.fundTransferBuyGoodsForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: 'Buy goods',
        paymentReason: this.getForm.reason.value,
        fxReferenceId: this.getForm.fxReferenceId.value,
        schedulePayment: this.getForm.schedulePayment.value,
        transferFee
      };
      const dialogRef = this.dialog.open(ConfirmPaymentComponent, {
        data: paymentData,
        disableClose: true,
      });

      dialogRef.afterClosed().subscribe((res) => {
        if (res.confirmed) {
          // this.sendMoney();
          this.otpVerification();
        }
      });
    } else {
      this.loading = false;
    }
  }

  otpVerification() {
    // const payload = {
    //   reference: '',
    //   accountNumber: this.getForm.sendTo.value.accountNumber,
    //   tillNumber: this.getForm.sendTo.value.tillNumber,
    //   amount: this.getForm.amount.value.amount,
    //   currency: this.getForm.amount.value.currency,
    //   remarks: '',
    //   bankID: '',
    //   customerId: '',
    //   countryCode: 'KE',
    // }
    const payload = {
      amount: this.getForm.amount.value.amount,
      beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
      beneficiaryBank: '',
      beneficiaryBankCode: '',
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
      transferType: 1, // Buy Goods
    };
    if (this.fundTransferBuyGoodsForm.valid) {
      this.buyGoodsService.buyGoods(payload);
      this.router.navigate(['/transact/buy-goods/otp-verification']);
    }
  }

  // Initiate fund transfer to buy goods.
  // sendMoney() {
  //   const payload = {
  //     amount: this.getForm.amount.value.amount,
  //     beneficiaryAccount: this.getForm.sendTo.value.accountNumber,
  //     beneficiaryBank: '',
  //     beneficiaryBankCode: '',
  //     beneficiaryCurrency: this.getForm.sendTo.value.currency,
  //     beneficiaryName: this.getForm.sendTo.value.accountName,
  //     currency: this.getForm.amount.value.currency,
  //     fxReferenceId: this.getForm.fxReferenceId.value,
  //     paymentReason: this.getForm.reason.value,
  //     schedulePayment: {
  //       frequency: this.getForm.schedulePayment.value.frequency.value,
  //       reminderDay: this.getForm.schedulePayment.value.reminderDay.value,
  //       startDate: this.getForm.schedulePayment.value.startDate.toISOString(),
  //       endDate: this.getForm.schedulePayment.value.endDate.toISOString(),
  //     },
  //     sourceAccount: this.getForm.sendFrom.value.accountNumber,
  //     transferType: 1, // Buy Goods
  //   };
  //   if (this.fundTransferBuyGoodsForm.valid) {
  //     this.buyGoodsService
  //       .sendToBuyGoods(payload)
  //       .subscribe((res) => {
  //         if (res.status) {
  //           this.loading = false;
  //           this.router.navigate([
  //             '/transact/buy-goods/otp-verification',
  //           ]);
  //         } else {
  //           this.loading = false;
  //           alert(res.message);
  //           // TODO:: Notify Error
  //         }
  //       },
  //       (err) => {
  //         this.loading = false;
  //         alert(
  //           `Sorry, we're unable to complete your transaction. Please give us some time to fix the problem and try again later.`
  //         );
  //       }
  //     );
  //   }
  // }
}

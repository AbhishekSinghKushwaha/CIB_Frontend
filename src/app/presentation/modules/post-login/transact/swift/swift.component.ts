import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SwiftTransferService } from 'src/app/core/services/transfers/swift/swift-transfer.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';

@Component({
  selector: 'app-swift',
  templateUrl: './swift.component.html',
  styleUrls: ['./swift.component.scss'],
})
export class SwiftComponent implements OnInit {
  swiftTransferForm: FormGroup;

  transferType = TransactionTypeConstants.TransferType;

  get getForm() {
    return this.swiftTransferForm.controls;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly swiftTransferService: SwiftTransferService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.swiftTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      fxReferenceId: ['', [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      schedulePayment: ['', [Validators.required]],
      license: ['', [Validators.required]],
      charges: ['', [Validators.required]],
      paymentCategory: ['', [Validators.required]],
      reason: [''],
    });
  }

  getTransferCharges() {
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      destinationBankCode: this.getForm.sendTo.value.bank.bankCode,
      destinationCountryCode: 'KE', // Default have it as kenya, then change to pick the user's country
      countryCode: 'KE', //TODO:: Default have it as kenya, then change to pick the user's country
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: Number(this.transferType.SWIFT), // For Another Bank Transfer Type
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
    if (this.swiftTransferForm.valid) {
      const paymentData = {
        from: this.getForm.sendFrom.value,
        to: this.getForm.sendTo.value,
        amount: this.getForm.amount.value,
        transactionType: this.transferType.SWIFT,
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
      transferType: Number(this.transferType.SWIFT), // RTGS or EFT
    };
    console.log(payload);
    if (this.swiftTransferForm.valid) {
      this.swiftTransferService.sendViaSwift(payload).subscribe((res) => {
        if (res.status) {
          this.router.navigate([
            '/transact/other-equity-account/submit-transfer',
          ]);
        } else {
          alert(res.message);
          // TODO:: Notify Error
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InterbankService } from 'src/app/core/services/transfers/interbank/interbank.service';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';
import { ConfirmPaymentComponent } from 'src/app/presentation/shared/modals/confirm-payment/confirm-payment.component';

@Component({
  selector: 'app-other-banks',
  templateUrl: './other-banks.component.html',
  styleUrls: ['./other-banks.component.scss'],
})
export class OtherBanksComponent implements OnInit {
  loading: boolean = false;
  interBankTransferForm: FormGroup;

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
  }

  initForm() {
    this.interBankTransferForm = this.fb.group({
      transactionType: ['', [Validators.required]],
      sendFrom: ['', [Validators.required]],
      sendTo: ['', Validators.required],
      amount: [{}, [Validators.required, accountLimitValidator]],
      fxReferenceId: ['', [Validators.required]],
      schedulePayment: ['', [Validators.required]],
      reason: [''],
    });
  }

  // Get Transfer charges, then confirm payment.
  getTransferCharges() {
    this.loading = true;
    const payload = {
      amount: this.getForm.amount.value.amount,
      currency: this.getForm.amount.value.currency,
      destinationAccount: this.getForm.sendTo.value.accountNumber,
      destinationBankCode: this.getForm.sendTo.value.bankCode,
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: Number(this.getForm.transactionType.value), // For Own Equity Account
    };
    this.interBankTransferService
      .getTransferCharges(payload)
      .subscribe((res) => {
        if (res.status) {
          console.log(res);
          this.loading = false;
          this.confirmPayment(res.data);
        } else {
          this.loading = false;
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
        transactionType: 'Send to your own Equity account',
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
    this.loading = true;
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
        reminderDay: this.getForm.schedulePayment.value.reminder.value,
        startDate: this.getForm.schedulePayment.value.startDate.toISOString(),
        endDate: this.getForm.schedulePayment.value.endDate.toISOString(),
      },
      sourceAccount: this.getForm.sendFrom.value.accountNumber,
      transferType: 1, // Own Equity Account
    };
    if (this.interBankTransferForm.valid) {
      this.interBankTransferService
        .sendToOtherBanks(payload)
        .subscribe((res) => {
          if (res.status) {
            this.loading = false;
            this.router.navigate([
              '/transact/other-equity-account/submit-transfer',
            ]);
          } else {
            this.loading = false;
            alert(res.message);
            // TODO:: Notify Error
          }
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoanService } from 'src/app/core/services/loan/loan.service';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import { PayLoanModalComponent } from '../pay-loan-modal/pay-loan-modal.component';

@Component({
  selector: 'app-pay-loan',
  templateUrl: './pay-loan.component.html',
  styleUrls: ['./pay-loan.component.scss'],
})
export class PayLoanComponent implements OnInit {
  ownEquityAccountTransferForm: FormGroup;
  transferType = TransactionTypeConstants.TransferType;
  modal: MatDialogRef<PayLoanModalComponent, any>;

  constructor(
    private fb: FormBuilder,
    private readonly loanService: LoanService,
    private readonly authService:AuthService,
    private readonly notificationModalService: NotificationModalService
  ) { }

  ngOnInit(): void {
    this.ownEquityAccountTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: [''],
      amount: ['', [Validators.required]],
    });
  }

  getLoanAccounts() {
    this.loanService.getLoanAccounts(this.authService.userState.corporateId);
  }

  payLoan(): void {
    this.loanService.confirmLoanPayment().subscribe((result: boolean) => {
      if (result) {
        this.notificationModalService.open({
          title: 'Insufficient balance',
          message:
            'You currently don’t have sufficient funds for charges and amount.',
          buttonText: 'Try again',
          image: '/assets/images/Illustrations/otp-error.svg'
        });
      }
    });
  }

  enterAmount(): void {
    this.loanService.payLoan().subscribe((amount: string) => {
      this.ownEquityAccountTransferForm.get('amount')?.setValue(amount);
      this.ownEquityAccountTransferForm.get('amount')?.updateValueAndValidity();
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationCompletionModel } from 'src/app/core/domain/confirmation-completion.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LoanService } from 'src/app/core/services/loan/loan.service';
import { ConfirmationModalService } from 'src/app/core/services/modal-services/confirmation-modal.service';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import SharedUtils from 'src/app/core/utils/shared.util';
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
  stage: string;
  completionData: ConfirmationCompletionModel;
  otpError: boolean;
  initialResponse: string;

  constructor(
    private fb: FormBuilder,
    private readonly loanService: LoanService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly notificationModalService: NotificationModalService
  ) { this.getLoanAccounts() }

  ngOnInit(): void {
    this.ownEquityAccountTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      amount: ['', [Validators.required]],
    });
  }

  getLoanAccounts() {
    this.loanService.getLoanAccounts(this.authService.userState.corporateId);
  }

  payLoan(): void {
    
    this.loanService.confirmLoanPayment({
      amount: this.ownEquityAccountTransferForm.value.amount,
      currency: 'KES',
      sourceAcct: this.ownEquityAccountTransferForm.value.sendFrom.accountNumber,
      loanAccountId: this.ownEquityAccountTransferForm.value.sendFrom.accountNumber,
      corporateId: this.authService.userState.corporateId
    }).subscribe((result: any) => {
      
      if (result) {
        this.stage = 'completed';
      }
    });
  }

  submitOTP(otp: string) {
    this.otpError = false;
    if (otp) {
      this.authService.submitOTP(otp).submitOTP.subscribe(
        (response) => {
          if (response) {
            this.payLoan();
          } else {
            this.otpError = true;
          }
        },
        (error) => {
          this.otpError = true;
          
        }
      );
    }
    const setDate = new Date().toISOString();
    const date = setDate.split('T')[0];
    const time = setDate.split('T')[1].split('.')[0];
    this.completionData =
      CONFIRMATIONCOMPLETION.loanrepaymentData(
        SharedUtils.formatMoney(this.ownEquityAccountTransferForm.value.amount) + 'KES',
        `${date.split('-').reverse().join('/')} at ${time}`
      )
  }

  submit() {
    const data = {
      title: 'Loan details',
      subtitle: 'To continue, please confirm your loan request',
      submitButtonText: 'Confirm',
      content: [{
        key: 'From',
        value: `${this.ownEquityAccountTransferForm.value.sendFrom.accountName} ${this.ownEquityAccountTransferForm.value.sendFrom.accountNumber}<br>${this.ownEquityAccountTransferForm.value.sendFrom.accountType}`
      }, {
        key: 'Loan balance',
        value: `${SharedUtils.formatMoney(this.ownEquityAccountTransferForm.value.sendTo.balance)} KES`
      }, {
        key: 'Amount ',
        value: SharedUtils.formatMoney(this.ownEquityAccountTransferForm.value.amount) + ' KES'
      }, {
        key: 'Balance after payment',
        value: SharedUtils.formatMoney(this.ownEquityAccountTransferForm.value.sendTo.balance - this.ownEquityAccountTransferForm.value.amount) + ' KES'
      }, {
        key: 'Charges',
        value: '00.00 KES'
      }]
    }
    this.confirmationModalService.open(data).afterClosed().subscribe((response: boolean) => {
      if (response) {
        this.authService.resendOTP().subscribe(
          (data: any) => {
            this.initialResponse = data.statusMessage;
            
            this.stage = 'OTP';
          },
        );

      }
    });
  }

  confirmationDone(response: any) {
    this.router.navigate(['/loan'])
  }

  enterAmount(): void {
    this.loanService.payLoan({ amount: this.ownEquityAccountTransferForm.value.sendTo.balance }).subscribe((amount: string) => {
      this.ownEquityAccountTransferForm.get('amount')?.setValue(amount);
      this.ownEquityAccountTransferForm.get('amount')?.updateValueAndValidity();
    });
  }

}

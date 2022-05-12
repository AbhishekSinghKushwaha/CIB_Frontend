import { Component, OnInit } from '@angular/core';
import { LoanService } from 'src/app/core/services/loan/loan.service';

@Component({
  selector: 'app-confirm-loan-payment-modal',
  templateUrl: './confirm-loan-payment-modal.component.html',
  styleUrls: ['./confirm-loan-payment-modal.component.scss'],
})
export class ConfirmLoanPaymentModalComponent implements OnInit {
  constructor(private readonly loanService: LoanService) { }

  ngOnInit(): void { }

  pay(): void {
    this.loanService.closeConfirmationDialog(true);
  }

  close(): void {
    this.loanService.closeConfirmationDialog(false);
  }
}

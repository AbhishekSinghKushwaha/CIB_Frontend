import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ConfirmLoanPaymentModalComponent } from 'src/app/presentation/modules/post-login/loan/components/confirm-loan-payment-modal/confirm-loan-payment-modal.component';
import { PayLoanModalComponent } from 'src/app/presentation/modules/post-login/loan/pay-loan-modal/pay-loan-modal.component';
import { environment } from 'src/environments/environment';
import urlList from 'src/app/core/services/service-list.json';
import { AccountModel } from '../../domain/account.model';

@Injectable({ providedIn: 'root' })
export class LoanService {
  modal: MatDialogRef<PayLoanModalComponent, any>;
  confirmLoanPaymentModal: MatDialogRef<ConfirmLoanPaymentModalComponent, any>;
  loanAccounts$ = new BehaviorSubject<AccountModel[]>([])
  private loans: AccountModel[];

  constructor(
    private readonly dialog: MatDialog,
    private readonly http: HttpClient,) { }

  getLoanAccounts(corporateId: string) {
    this.http.get(environment.apiUrl + urlList.loan.loanAccounts +corporateId)
    .subscribe((accounts:any)=>{
      console.log('accounts',accounts);
      if(accounts?.data?.length) {
        this.loans = accounts.data;
        this.loanAccounts$.next(accounts.data);
        
        }
    })
  }

  payLoan(): Observable<any> {
    this.modal = this.dialog.open<PayLoanModalComponent, any>(
      PayLoanModalComponent,
      { disableClose: false, data: { amount: '314,731.00' } }
    );

    return this.modal.afterClosed();
  }

  closeDialog(): void {
    this.modal.close();
  }

  confirmLoanPayment(): Observable<any> {
    this.confirmLoanPaymentModal = this.dialog.open<
      ConfirmLoanPaymentModalComponent,
      any
    >(ConfirmLoanPaymentModalComponent, { disableClose: false });

    return this.confirmLoanPaymentModal.afterClosed();
  }

  closeConfirmationDialog(result: boolean): void {
    this.confirmLoanPaymentModal.close(result);
  }
}

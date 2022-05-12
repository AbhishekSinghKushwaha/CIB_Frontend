import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanComponent } from './loan.component';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoanPaymentSuccessComponent } from './components/loan-payment-success/loan-payment-success.component';
import { PayLoanComponent } from './pay-loan/pay-loan.component';
import { StatementComponent } from './components/statement/statement.component';

const routes: Routes = [
  {
    path: '',
    component: LoanComponent,
  },
  {
    path: 'detail/:id',
    component: LoanDetailsComponent,
  },
  {
    path: 'statement',
    component: StatementComponent,
  },
  { path: 'repayment/:id', component: PayLoanComponent },
  { path: 'success', component: LoanPaymentSuccessComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanRoutingModule { }

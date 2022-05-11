import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanRoutingModule } from './loan-routing.module';
import { LoanComponent } from './loan.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { LoanDetailsComponent } from './loan-details/loan-details.component';
import { LoanActionComponent } from './components/loan-action/loan-action.component';
import { StatementComponent } from './components/statement/statement.component';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';
import { StatementModule } from '../transact/statement/statement.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { PayLoanComponent } from './pay-loan/pay-loan.component';
import { PayLoanModalComponent } from './pay-loan-modal/pay-loan-modal.component';
import { ConfirmLoanPaymentModalComponent } from './components/confirm-loan-payment-modal/confirm-loan-payment-modal.component';
import { LoanPaymentSuccessComponent } from './components/loan-payment-success/loan-payment-success.component';
import { StatementDocumentComponent } from './components/statement-document/statement-document.component';
import { StatementDocumentDownloadActionsComponent } from './components/statement-document-download-actions/statement-document-download-actions.component';
import { StatementDocumentShareActionsComponent } from './components/statement-document-share-actions/statement-document-share-actions.component';
import { NotificationModalModule } from 'src/app/presentation/shared/modals/notification-modal/notification-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewLoanComponent } from './new-loan/new-loan.component';

@NgModule({
  declarations: [
    LoanComponent,
    LoanDetailsComponent,
    LoanActionComponent,
    StatementComponent,
    PayLoanComponent,
    PayLoanModalComponent,
    ConfirmLoanPaymentModalComponent,
    LoanPaymentSuccessComponent,
    StatementDocumentComponent,
    StatementDocumentDownloadActionsComponent,
    StatementDocumentShareActionsComponent,
    NewLoanComponent,
  ],
  imports: [
    CommonModule,
    LoanRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    SchedulePaymentModule,
    StatementModule,
    FormElementsModule,
    NotificationModalModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class LoanModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';
import { StatementDetailService } from 'src/app/core/services/statement/statement-detail/statement-detail.service';
import { StatementModalModule } from 'src/app/presentation/shared/modals/statement-modal/statement-modal.module';


@NgModule({
  declarations: [
    StatementComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    StatementRoutingModule,
    FormElementsModule,
    SchedulePaymentModule,
    FormsModule,
    StatementModalModule
  ],
  providers: [StatementDetailService]
})
export class StatementModule { }

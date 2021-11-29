import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatementRoutingModule } from './statement-routing.module';
import { StatementComponent } from './statement.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';


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
  ]
})
export class StatementModule { }

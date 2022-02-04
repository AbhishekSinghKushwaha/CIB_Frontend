import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulePaymentComponent } from './schedule-payment.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { PaymentFrequencyModalModule } from '../payment-frequency-modal/payment-frequency-modal.module';
import { PaymentReminderModalModule } from '../payment-reminder-modal/payment-reminder-modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchedulePaymentConstants } from 'src/app/core/utils/constants/schedule-payment.constants';
import { FrequencySelectionComponent } from './frequency-selection/frequency-selection.component';
import { ReminderSelectionComponent } from './reminder-selection/reminder-selection.component';

@NgModule({
  declarations: [
    SchedulePaymentComponent,
    FrequencySelectionComponent,
    ReminderSelectionComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    PaymentFrequencyModalModule,
    PaymentReminderModalModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SchedulePaymentComponent],
  providers: [SchedulePaymentConstants],
})
export class SchedulePaymentModule {}

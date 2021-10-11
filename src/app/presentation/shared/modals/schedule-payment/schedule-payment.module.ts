import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulePaymentComponent } from './schedule-payment.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';
import { FrequencySelectionConstants } from '../../../../core/utils/constants/schedule-payment-frequency.constants';
import { ReminderSelectionConstants } from '../../../../core/utils/constants/Schedule-payment-reminder.constants';
import { FrequencySelectionComponent } from './frequency-selection/frequency-selection.component';
import { ReminderSelectionComponent } from './reminder-selection/reminder-selection.component'



@NgModule({
  declarations: [
    SchedulePaymentComponent,
    FrequencySelectionComponent,
    ReminderSelectionComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports:[
    SchedulePaymentComponent
  ],
  providers:[
    SchedulePaymentService,
    FrequencySelectionConstants,
    ReminderSelectionConstants
  ]
})
export class SchedulePaymentModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulePaymentComponent } from './schedule-payment.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { OwnequityModalService } from '../../../../core/services/ownequity-modal/ownequity-modal.service';
import { ScheduledPaymentService } from 'src/app/core/services/scheduled-payment/scheduled-payment.service';
import { PaymentFrequencyModalModule } from '../payment-frequency-modal/payment-frequency-modal.module';
import { PaymentReminderModalModule } from '../payment-reminder-modal/payment-reminder-modal.module';



@NgModule({
  declarations: [
    SchedulePaymentComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    PaymentFrequencyModalModule,
    PaymentReminderModalModule
  ],
  exports:[
    SchedulePaymentComponent
  ],
  providers:[
    OwnequityModalService,
    ScheduledPaymentService,
  ]
})
export class SchedulePaymentModule { }

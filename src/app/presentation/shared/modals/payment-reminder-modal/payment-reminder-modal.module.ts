import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentReminderModalComponent } from './payment-reminder-modal.component';
import { PaymentReminderListItemsComponent } from '../../components/payment-reminder-list-items/payment-reminder-list-items.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@NgModule({
  declarations: [
    PaymentReminderModalComponent,
    PaymentReminderListItemsComponent,
  ],
  exports: [PaymentReminderListItemsComponent],
  imports: [CommonModule, MatStyleModule],
  providers: [SchedulePaymentService],
})
export class PaymentReminderModalModule {}

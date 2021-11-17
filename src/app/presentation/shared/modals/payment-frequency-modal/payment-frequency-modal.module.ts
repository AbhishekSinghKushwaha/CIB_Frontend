import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFrequencyModalComponent } from './payment-frequency-modal.component';
import { PaymentFrequencyListItemComponent } from '../../components/payment-frequency-list-item/payment-frequency-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@NgModule({
  declarations: [
    PaymentFrequencyModalComponent,
    PaymentFrequencyListItemComponent,
  ],
  imports: [CommonModule, MatStyleModule],
  exports: [PaymentFrequencyModalComponent, PaymentFrequencyListItemComponent],
  providers: [SchedulePaymentService],
})
export class PaymentFrequencyModalModule {}

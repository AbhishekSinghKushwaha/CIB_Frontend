import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentFrequencyModalComponent } from './payment-frequency-modal.component';
import { PaymentFrequencyListItemComponent } from './payment-frequency-list-item/payment-frequency-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { PaymentFrequencyService } from 'src/app/core/services/payment-frequency/payment-frequency.service';



@NgModule({
  declarations: [
    PaymentFrequencyModalComponent,
    PaymentFrequencyListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports: [
    PaymentFrequencyModalComponent,
    PaymentFrequencyListItemComponent
  ],
  providers:[
    PaymentFrequencyService
  ]
})
export class PaymentFrequencyModalModule { }

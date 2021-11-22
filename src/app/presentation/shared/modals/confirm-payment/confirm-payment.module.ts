import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmPaymentComponent } from './confirm-payment.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    ConfirmPaymentComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    ConfirmPaymentComponent
  ]
})
export class ConfirmPaymentModule { }

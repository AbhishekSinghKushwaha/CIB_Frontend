import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransferFromModalModule } from './transfer-from-modal/transfer-from-modal.module';
import { TransferToModalModule } from './transfer-to-modal/transfer-to-modal.module';
import { CurrencySelectionModule } from './currency-selection/currency-selection.module';
import { SchedulePaymentModule } from './schedule-payment/schedule-payment.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TransferFromModalModule,
    TransferToModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
  ],
  exports: [
    TransferFromModalModule,
    TransferToModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
  ],
  providers: [],
})
export class SharedModalsModule {}

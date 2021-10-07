import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendOwnEquityRoutingModule } from './send-own-equity-routing.module';
import { SendOwnEquityComponent } from './send-own-equity.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CurrencySelectionModule } from '../../../../../shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from '../../../../../shared/modals/schedule-payment/schedule-payment.module';
import { AccountSelectionModule } from  '../../../../../shared/modals/account-selection/account-selection.module';

@NgModule({
  declarations: [
    SendOwnEquityComponent
  ],
  imports: [
    CommonModule,
    SendOwnEquityRoutingModule,
    MatStyleModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    AccountSelectionModule
  ]
})
export class SendOwnEquityModule { }

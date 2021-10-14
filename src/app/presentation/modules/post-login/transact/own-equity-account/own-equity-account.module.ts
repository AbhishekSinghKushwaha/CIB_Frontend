import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnEquityAccountRoutingModule } from './own-equity-account-routing.module';
import { OwnEquityAccountComponent } from './own-equity-account.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { CurrencySelectionModule } from '../../../../shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from '../../../../shared/modals/schedule-payment/schedule-payment.module';
import { SelectAccountModalModule } from './../../../../shared/modals/select-account-modal/select-account-modal.module';
import { SelectAccountSendToModule } from './../../../../shared/modals/select-account-send-to/select-account-send-to.module';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';

@NgModule({
  declarations: [
    OwnEquityAccountComponent
  ],
  imports: [
    CommonModule,
    OwnEquityAccountRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    SelectAccountModalModule,
    SelectAccountSendToModule
  ],
  providers: [
    CurrencySelectionConstants,
    SelectAccountConstants
  ]
})
export class OwnEquityAccountModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntercountryFundTransferRoutingModule } from './intercountry-fund-transfer-routing.module';
import { IntercountryFundTransferComponent } from './intercountry-fund-transfer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';

@NgModule({
  declarations: [IntercountryFundTransferComponent],
  imports: [
    CommonModule,
    IntercountryFundTransferRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    ReactiveFormsModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    FormElementsModule,
  ],
  providers: [],
})
export class IntercountryFundTransferModule {}

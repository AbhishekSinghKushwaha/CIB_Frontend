import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntercountryFundTransferRoutingModule } from './intercountry-fund-transfer-routing.module';
import { IntercountryFundTransferComponent } from './intercountry-fund-transfer.component';

import { ReactiveFormsModule } from '@angular/forms';
import { FavouritesModalModule } from './../../../../shared/modals/favourites-modal/favourites-modal.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SelectAccountModalModule } from './../../../../shared/modals/select-account-modal/select-account-modal.module';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';


@NgModule({
  declarations: [
    IntercountryFundTransferComponent
  ],
  imports: [
    CommonModule,
    IntercountryFundTransferRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    ReactiveFormsModule,
    FavouritesModalModule,
    SelectAccountModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    FormElementsModule,
  ],
  providers: [CurrencySelectionConstants, SelectAccountConstants],
})
export class IntercountryFundTransferModule { }

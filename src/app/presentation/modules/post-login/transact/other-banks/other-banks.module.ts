import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherBanksRoutingModule } from './other-banks-routing.module';
import { OtherBanksComponent } from './other-banks.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SelectAccountModalModule } from 'src/app/presentation/shared/modals/select-account-modal/select-account-modal.module';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { SelectAccountConstants } from 'src/app/data/repository/select-account-mock-repository/select-account.constants';
import { FavouritesModalModule } from 'src/app/presentation/shared/modals/favourites-modal/favourites-modal.module';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';

@NgModule({
  declarations: [OtherBanksComponent],
  imports: [
    CommonModule,
    OtherBanksRoutingModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,
    SharedComponentsModule,
    SelectAccountModalModule,
    SchedulePaymentModule,
    FavouritesModalModule,
    CurrencySelectionModule,
  ],
  providers: [CurrencySelectionConstants, SelectAccountConstants],
})
export class OtherBanksModule {}

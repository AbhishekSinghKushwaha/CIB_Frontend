import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileMoneyRoutingModule } from './mobile-money-routing.module';
import { MobileMoneyComponent } from './mobile-money.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';
import { FavouritesModalModule } from 'src/app/presentation/shared/modals/favourites-modal/favourites-modal.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';
import { SelectAccountModalModule } from 'src/app/presentation/shared/modals/select-account-modal/select-account-modal.module';

@NgModule({
  declarations: [MobileMoneyComponent],
  imports: [
    CommonModule,
    MobileMoneyRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    ReactiveFormsModule,
    FavouritesModalModule,
    SelectAccountModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
    FormElementsModule,
  ],
})
export class MobileMoneyModule {}

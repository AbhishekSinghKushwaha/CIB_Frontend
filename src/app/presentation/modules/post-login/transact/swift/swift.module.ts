import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SwiftRoutingModule } from './swift-routing.module';
import { SwiftComponent } from './swift.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SelectAccountModalModule } from 'src/app/presentation/shared/modals/select-account-modal/select-account-modal.module';
import { SchedulePaymentModule } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.module';
import { CurrencySelectionModule } from 'src/app/presentation/shared/modals/currency-selection/currency-selection.module';
import { FavouritesModalModule } from 'src/app/presentation/shared/modals/favourites-modal/favourites-modal.module';

@NgModule({
  declarations: [SwiftComponent],
  imports: [
    CommonModule,
    SwiftRoutingModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule,
    SelectAccountModalModule,
    FavouritesModalModule,
    CurrencySelectionModule,
    SchedulePaymentModule,
  ],
})
export class SwiftModule {}

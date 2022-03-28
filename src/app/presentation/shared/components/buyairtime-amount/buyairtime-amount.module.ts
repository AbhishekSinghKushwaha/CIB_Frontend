import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyairtimeAmountComponent } from './buyairtime-amount.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';
import { FixedRangeModule } from 'src/app/presentation/shared/modals/fixed-range/fixed-range.module';
import { FixedRangeConstants } from 'src/app/core/utils/constants/fixed-range.constants';


@NgModule({
  declarations: [
    BuyairtimeAmountComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    FixedRangeModule
  ],
  exports: [
    BuyairtimeAmountComponent
  ],
  providers: [
    CurrencySelectionConstants,
    FixedRangeConstants
  ]
})
export class BuyairtimeAmountModule { }

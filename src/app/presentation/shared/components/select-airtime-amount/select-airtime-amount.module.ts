import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectAirtimeAmountComponent } from './select-airtime-amount.component';
import { BuyairtimeAmountModule } from '../buyairtime-amount/buyairtime-amount.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencySelectionConstants } from 'src/app/core/utils/constants/currency-selection.constants';


@NgModule({
  declarations: [
    SelectAirtimeAmountComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormElementsModule,
    FormsModule,
    ReactiveFormsModule,
    BuyairtimeAmountModule
  ],
  exports: [
    SelectAirtimeAmountComponent
  ],
  providers: [
    CurrencySelectionConstants
  ]
})
export class SelectAirtimeAmountModule { }

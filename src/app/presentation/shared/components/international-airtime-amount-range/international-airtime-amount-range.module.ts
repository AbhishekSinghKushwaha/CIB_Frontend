import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternationalAirtimeAmountRangeComponent } from './international-airtime-amount-range.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectAirtimeAmountModule } from '../select-airtime-amount/select-airtime-amount.module';

@NgModule({
  declarations: [
    InternationalAirtimeAmountRangeComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    SelectAirtimeAmountModule
  ],
  exports: [
    InternationalAirtimeAmountRangeComponent
  ]
})
export class InternationalAirtimeAmountRangeModule { }

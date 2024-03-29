import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AirtimeMobileNumberComponent } from './airtime-mobile-number.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AirtimeMobileNumberService } from 'src/app/core/services/airtime-mobile-number/airtime-mobile-number.service';
import { InternationalAirtimeAmountRangeModule } from '../international-airtime-amount-range/international-airtime-amount-range.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';

@NgModule({
  declarations: [
    AirtimeMobileNumberComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    InternationalAirtimeAmountRangeModule,
    FormElementsModule
  ],
  exports: [
    AirtimeMobileNumberComponent
  ],
  providers: [
    AirtimeMobileNumberService
  ]
})
export class AirtimeMobileNumberModule { }

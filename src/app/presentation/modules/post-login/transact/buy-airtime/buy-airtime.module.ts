import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyAirtimeRoutingModule } from './buy-airtime-routing.module';
import { BuyAirtimeComponent } from './buy-airtime.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { BuyairtimeAmountModule } from 'src/app/presentation/shared/components/buyairtime-amount/buyairtime-amount.module';


@NgModule({
  declarations: [
    BuyAirtimeComponent
  ],
  imports: [
    CommonModule,
    BuyAirtimeRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SharedModalsModule,
    FormElementsModule,
    BuyairtimeAmountModule
  ]
})
export class BuyAirtimeModule { }

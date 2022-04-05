import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingOrdersFormRoutingModule } from './standing-orders-form-routing.module';
import { StandingOrdersFormComponent } from './standing-orders-form.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { SelectTransactionTypeModule } from 'src/app/presentation/shared/modals/select-transaction-type/select-transaction-type.module';
import { BuyairtimeAmountModule } from 'src/app/presentation/shared/components/buyairtime-amount/buyairtime-amount.module';

@NgModule({
  declarations: [
    StandingOrdersFormComponent
  ],
  imports: [
    CommonModule,
    StandingOrdersFormRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    FormElementsModule,
    SharedModalsModule,
    SelectTransactionTypeModule,
    BuyairtimeAmountModule
  ],
  exports: [
    StandingOrdersFormComponent
  ]
})
export class StandingOrdersFormModule { }

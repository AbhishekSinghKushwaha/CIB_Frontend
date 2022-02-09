import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteGoodsPurchaseRoutingModule } from './complete-goods-purchase-routing.module';
import { CompleteGoodsPurchaseComponent } from './complete-goods-purchase.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { AddMerchantModule } from 'src/app/presentation/shared/modals/add-merchant/add-merchant.module';

@NgModule({
  declarations: [
    CompleteGoodsPurchaseComponent
  ],
  imports: [
    CommonModule,
    CompleteGoodsPurchaseRoutingModule,
    MatStyleModule,
    AddMerchantModule
  ]
})
export class CompleteGoodsPurchaseModule { }

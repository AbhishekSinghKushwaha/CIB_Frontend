import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyGoodsRoutingModule } from './buy-goods-routing.module';
import { BuyGoodsComponent } from './buy-goods.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';

@NgModule({
  declarations: [BuyGoodsComponent],
  imports: [
    CommonModule,
    BuyGoodsRoutingModule,
    SharedComponentsModule,
    SharedModalsModule,
    MatStyleModule,
    FormElementsModule,
  ],
  providers: [],
})
export class BuyGoodsModule {}

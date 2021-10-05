import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyGoodsRoutingModule } from './buy-goods-routing.module';
import { BuyGoodsComponent } from './buy-goods.component';


@NgModule({
  declarations: [
    BuyGoodsComponent
  ],
  imports: [
    CommonModule,
    BuyGoodsRoutingModule
  ]
})
export class BuyGoodsModule { }

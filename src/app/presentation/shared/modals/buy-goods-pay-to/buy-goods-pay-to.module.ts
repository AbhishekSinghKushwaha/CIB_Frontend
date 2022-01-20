import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyGoodsPayToComponent } from './buy-goods-pay-to.component';

import { FormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';

import { BuyGoodsPayToService } from 'src/app/core/services/buy-goods-pay-to/buy-goods-pay-to.service';
import { BuyGoodsFavouritesModule } from '../../components/buy-goods-favourites/buy-goods-favourites.module';
import { MerchantTillNumberModule } from '../merchant-till-number/merchant-till-number.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [BuyGoodsPayToComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatStyleModule,
    BuyGoodsFavouritesModule,
    MerchantTillNumberModule,
    PipesModule,
  ],
  exports: [BuyGoodsPayToComponent],
  providers: [BuyGoodsPayToService],
})
export class BuyGoodsPayToModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyGoodsFavouritesComponent } from './buy-goods-favourites.component';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    BuyGoodsFavouritesComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    BuyGoodsFavouritesComponent
  ]
})
export class BuyGoodsFavouritesModule { }

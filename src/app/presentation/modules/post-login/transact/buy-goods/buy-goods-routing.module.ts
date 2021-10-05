import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyGoodsComponent } from './buy-goods.component';

const routes: Routes = [
  {
    path: '',
    component: BuyGoodsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyGoodsRoutingModule { }

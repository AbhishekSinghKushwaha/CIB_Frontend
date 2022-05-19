import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyGoodsComponent } from './buy-goods.component';

const routes: Routes = [
  {
    path: '',
    component: BuyGoodsComponent
  },
  {
    path: 'submit-transfer',
    loadChildren: () => import('../otp-verify/complete-goods-purchase/complete-goods-purchase.module').then(m => m.CompleteGoodsPurchaseModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyGoodsRoutingModule { }

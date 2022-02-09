import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyGoodsComponent } from './buy-goods.component';

const routes: Routes = [
  {
    path: '',
    component: BuyGoodsComponent
  },
  {
    path: 'otp-verification',
    loadChildren: () => import('../otp-verify/otp-verification/otp-verification.module').then(m => m.OtpVerificationModule)
  },
  {
    path: 'otp-verification-code',
    loadChildren: () => import('../otp-verify/otp-verification-code/otp-verification-code.module').then(m => m.OtpVerificationCodeModule)
  },
  {
    path: 'contact-details',
    loadChildren: () => import('../otp-verify/contact-details/contact-details.module').then(m => m.ContactDetailsModule)
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

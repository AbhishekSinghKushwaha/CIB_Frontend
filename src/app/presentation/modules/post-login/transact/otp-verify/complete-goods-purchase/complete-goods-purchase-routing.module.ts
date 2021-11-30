import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteGoodsPurchaseComponent } from './complete-goods-purchase.component';

const routes: Routes = [
  {
    path: '',
    component: CompleteGoodsPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteGoodsPurchaseRoutingModule { }

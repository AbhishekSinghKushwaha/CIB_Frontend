import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyAirtimeComponent } from './buy-airtime.component';

const routes: Routes = [
  {
    path: '',
    component: BuyAirtimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyAirtimeRoutingModule { }

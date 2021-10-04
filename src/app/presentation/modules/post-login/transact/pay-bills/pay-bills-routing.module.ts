import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayBillsComponent } from './pay-bills.component';

const routes: Routes = [
  {
    path: '',
    component: PayBillsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayBillsRoutingModule { }

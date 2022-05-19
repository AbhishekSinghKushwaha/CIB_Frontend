import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingOrdersDetailComponent } from './standing-orders-detail.component'
const routes: Routes = [
  {
    path: '',
    component: StandingOrdersDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingOrdersDetailRoutingModule { }

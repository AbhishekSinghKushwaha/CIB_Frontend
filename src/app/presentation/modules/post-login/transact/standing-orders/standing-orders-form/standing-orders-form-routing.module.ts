import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingOrdersFormComponent } from  './standing-orders-form.component';

const routes: Routes = [
  {
    path: '',
    component: StandingOrdersFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingOrdersFormRoutingModule { }

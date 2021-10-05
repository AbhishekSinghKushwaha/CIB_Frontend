import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileMoneyComponent } from './mobile-money.component';

const routes: Routes = [
  {
    path: '',
    component: MobileMoneyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileMoneyRoutingModule { }

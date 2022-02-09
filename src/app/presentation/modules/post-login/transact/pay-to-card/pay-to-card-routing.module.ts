import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayToCardComponent } from './pay-to-card.component';

const routes: Routes = [
  {
    path: '',
    component: PayToCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayToCardRoutingModule { }

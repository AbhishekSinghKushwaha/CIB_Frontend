import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyAirtimeComponent } from './buy-airtime.component';

const routes: Routes = [
  {
    path: '',
    component: BuyAirtimeComponent
  },
  {
    path: 'success',
    loadChildren: () => import('src/app/presentation/shared/modals/airtime-success/airtime-success.module').then(m => m.AirtimeSuccessModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyAirtimeRoutingModule { }

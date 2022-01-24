import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntercountryFundTransferComponent } from './intercountry-fund-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: IntercountryFundTransferComponent
  },
  {
    path: 'submit-transfer',
    loadChildren: () => import('../../transact/complete-transfer/complete-transfer.module').then(m => m.CompleteTransferModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntercountryFundTransferRoutingModule { }

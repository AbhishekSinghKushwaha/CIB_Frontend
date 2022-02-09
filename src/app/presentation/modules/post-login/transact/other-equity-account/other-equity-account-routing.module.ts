import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherEquityAccountComponent } from './other-equity-account.component';

const routes: Routes = [
  {
    path: '',
    component: OtherEquityAccountComponent
  },
  {
    path: 'submit-transfer',
    loadChildren: () => import('../complete-transfer/complete-transfer.module').then(m => m.CompleteTransferModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherEquityAccountRoutingModule { }

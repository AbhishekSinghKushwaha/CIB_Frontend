import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoreComponent } from './more.component';

const routes: Routes = [
  {
    path: '',
    component: MoreComponent
  },
  {
    path: 'intercountry-fund-transfer',
    loadChildren: (): Promise<any> =>
      import('./intercountry-fund-transfer/intercountry-fund-transfer.module').then(
        (m) => m.IntercountryFundTransferModule
      ),
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreRoutingModule { }

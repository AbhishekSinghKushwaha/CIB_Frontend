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
    path: 'profile-detail',
    loadChildren: (): Promise<any> =>
      import('./profile-detail/profile-detail.module').then(
        (m) => m.ProfileDetailModule
      ),
  },
  {
    path: 'otp-access',
    loadChildren: (): Promise<any> =>
      import('./otp-access/otp-access.module').then(
        (m) => m.OtpAccessModule
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

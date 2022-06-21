import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';
import { MoreComponent } from './more.component';
import { OtpAccessVerificationComponent } from './otp-access/otp-access-verification/otp-access-verification.component';
import { OtpSuccessComponent } from './otp-access/otp-success/otp-success.component';
import { OtpVerificationComponent } from './otp-access/otp-verification/otp-verification.component';

const routes: Routes = [
  {
    path: '',
    component: MoreComponent
  },
  {
    path: 'security',
    component: SecuritySettingsComponent
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
<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<AUTO GENERATED BY CONFLICT EXTENSION<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< develop
    path: 'verification-process',
    component: OtpVerificationComponent
  },
  {
    path: 'otp-complete',
    component: OtpSuccessComponent
  },
  {
    path: 'otp-access-verify/:data/:type',
    component: OtpAccessVerificationComponent
  },
  {
====================================AUTO GENERATED BY CONFLICT EXTENSION====================================
    path: 'change-password',
    loadChildren: (): Promise<any> =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>AUTO GENERATED BY CONFLICT EXTENSION>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Feature/changeofPassword
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreRoutingModule { }

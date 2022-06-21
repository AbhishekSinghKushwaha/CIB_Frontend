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
    path: 'change-password',
    loadChildren: (): Promise<any> =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: 'notification-preference',
    loadChildren: (): Promise<any> =>
      import('./notification-preference/notification-preference.module').then(
        (m) => m.NotificationPreferenceModule
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

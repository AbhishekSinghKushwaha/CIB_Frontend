import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';
import { MoreComponent } from './more.component';


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
    path: 'otp-access',
    loadChildren: (): Promise<any> =>
      import('./otp-access/otp-access.module').then(
        (m) => m.OtpAccessModule
      ),
  },

  {
    path: 'change-password',
    loadChildren: (): Promise<any> =>
      import('./change-password/change-password.module').then(
        (m) => m.ChangePasswordModule
      ),
  },
  {
    path: 'security-questions',
    loadChildren: (): Promise<any> =>
      import('./security-questions/security-questions.module').then(
        (m) => m.SecurityQuestionsModule
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

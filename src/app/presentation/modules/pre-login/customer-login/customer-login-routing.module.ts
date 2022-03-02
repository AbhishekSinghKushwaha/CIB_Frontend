import { LoginGuard } from 'src/app/core/utils/guards/login/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityVerificationGuard } from 'src/app/core/utils/guards/security-verification/security-verification.guard';
import { SmsVerificationGuard } from 'src/app/core/utils/guards/sms-verification/sms-verification.guard';
import { CustomerLoginComponent } from './customer-login.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLoginComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<any> =>
          import('./login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'sms-verification',
        loadChildren: (): Promise<any> =>
          import('./login-sms-verification/login-sms-verification.module').then(
            (m) => m.LoginSmsVerificationModule
          ),
        canActivate: [SmsVerificationGuard],
      },
      {
        path: 'security-verification',
        loadChildren: (): Promise<any> =>
          import('./login-security-verification/login-security-verification.module').then(
            (m) => m.LoginSecurityVerificationModule
          ),
        canActivate: [SecurityVerificationGuard],
      },
      {
        path: 'security-challenge',
        loadChildren: (): Promise<any> =>
          import('./login-security-challenge/login-security-challenge.module').then(
            (m) => m.LoginSecurityChallengeModule
          ),
        // canActivate: [SecurityChallengeGuard],
      },
      {
        path: 'forgot-password',
        loadChildren: (): Promise<any> =>
          import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerLoginRoutingModule { }

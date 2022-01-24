import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityChallengeGuard } from 'src/app/core/utils/guards/security-challenge/security-challenge.guard';
import { SecurityVerificationGuard } from 'src/app/core/utils/guards/security-verification/security-verification.guard';
import { SmsVerificationGuard } from 'src/app/core/utils/guards/sms-verification/sms-verification.guard';
import { PreLoginComponent } from './pre-login.component';

const routes: Routes = [
  {
    path: '',
    component: PreLoginComponent,
    children: [
      {
        path: '',
        redirectTo: 'customer-onboarding',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: (): Promise<any> => import('./login/login.module').then(m => m.LoginModule),
      },
      {
        path: 'sms-verification',
        loadChildren: (): Promise<any> => import('./login-sms-verification/login-sms-verification.module').then(m => m.LoginSmsVerificationModule),
        canActivate: [SmsVerificationGuard]
      },
      {
        path: 'security-verification',
        loadChildren: (): Promise<any> => import('./security-verification/security-verification.module').then(m => m.SecurityVerificationModule),
        canActivate: [SecurityVerificationGuard]
      },
      {
        path: 'security-challenge',
        loadChildren: (): Promise<any> => import('./security-challenge/security-challenge.module').then(m => m.SecurityChallengeModule),
        canActivate: [SecurityChallengeGuard]
      },
      {
        path: 'forgot-password',
        loadChildren: (): Promise<any> => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
      },
      {
        path: 'customer-onboarding',
        loadChildren: (): Promise<any> => import('./customer-onboarding/customer-onboarding.module').then(m => m.CustomerOnboardingModule)
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreLoginRoutingModule { }

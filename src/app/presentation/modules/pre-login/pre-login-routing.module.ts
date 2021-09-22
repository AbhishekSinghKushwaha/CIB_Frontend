import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreLoginComponent } from './pre-login.component';

const routes: Routes = [
  {
    path: '',
    component: PreLoginComponent,
    children: [
      {
         path: '',
         redirectTo: 'login',
         pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: (): Promise<any> => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'sms-verification',
        loadChildren: (): Promise<any> => import('./sms-verification/sms-verification.module').then(m => m.SmsVerificationModule)
      },
      {
        path: 'security-verification',
        loadChildren: (): Promise<any> => import('./security-verification/security-verification.module').then(m => m.SecurityVerificationModule)
      },
      {
        path: 'security-challenge',
        loadChildren: (): Promise<any> => import('./security-challenge/security-challenge.module').then(m => m.SecurityChallengeModule)
      },
      {
        path: 'forgot-password',
        loadChildren: (): Promise<any> =>
          import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          )
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreLoginRoutingModule { }

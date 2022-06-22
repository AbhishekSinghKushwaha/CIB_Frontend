import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpAccessVerificationComponent } from './otp-access-verification/otp-access-verification.component';
import { OtpSuccessComponent } from './otp-success/otp-success.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';

const routes: Routes = [
  {
    path: 'verification-process',
    component: OtpVerificationComponent
  },
  {
    path: 'otp-complete',
    component: OtpSuccessComponent
  },
  {
    path: 'verify/:data',
    component: OtpAccessVerificationComponent
  },
  {
    path: '**',
    redirectTo: '/more'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpAccessRoutingModule { }

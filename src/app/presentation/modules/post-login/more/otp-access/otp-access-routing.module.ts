import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpAccessVerificationComponent } from './otp-access-verification/otp-access-verification.component';
import { OtpAccessComponent } from './otp-access.component';
import { OtpSuccessComponent } from './otp-success/otp-success.component';

const routes: Routes = [
  {
    path: '',
    component: OtpAccessComponent
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

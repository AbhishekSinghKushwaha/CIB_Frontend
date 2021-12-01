import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtpVerificationCodeComponent } from  './otp-verification-code.component'

const routes: Routes = [
  {
    path: '',
    component: OtpVerificationCodeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpVerificationCodeRoutingModule { }

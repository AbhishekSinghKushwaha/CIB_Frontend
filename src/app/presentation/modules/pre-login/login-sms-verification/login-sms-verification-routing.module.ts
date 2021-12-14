import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSmsVerificationComponent } from './login-sms-verification.component';

const routes: Routes = [{
  path: '',
  component: LoginSmsVerificationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSmsVerificationRoutingModule { }

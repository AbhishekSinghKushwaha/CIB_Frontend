import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSecurityVerificationComponent } from './login-security-verification.component';

const routes: Routes = [{
  path: '',
  component: LoginSecurityVerificationComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSecurityVerificationRoutingModule { }

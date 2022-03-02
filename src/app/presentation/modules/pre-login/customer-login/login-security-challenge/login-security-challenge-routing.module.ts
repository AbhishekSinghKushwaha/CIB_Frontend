import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSecurityChallengeComponent } from './login-security-challenge.component';

const routes: Routes = [{
  path: '',
  component: LoginSecurityChallengeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginSecurityChallengeRoutingModule { }

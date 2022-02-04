import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateCredentialsComponent } from './components/validate-credentials/validate-credentials.component';

const routes: Routes = [
  {
    path: '',
    component: ValidateCredentialsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}

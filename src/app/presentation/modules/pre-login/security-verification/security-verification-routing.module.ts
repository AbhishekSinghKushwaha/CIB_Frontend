import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityVerificationComponent } from './security-verification.component';

const routes: Routes = [{
    path: '',
    component: SecurityVerificationComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityVerificationRoutingModule { }

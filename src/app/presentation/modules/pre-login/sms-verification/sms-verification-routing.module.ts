import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SmsVerificationComponent } from './sms-verification.component';

const routes: Routes = [{
    path: '',
    component: SmsVerificationComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SmsVerificationRoutingModule { }

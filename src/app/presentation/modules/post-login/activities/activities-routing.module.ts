import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivitiesComponent } from './activities.component';
import { ActivityDetailComponent } from './activity-detail/activity-detail.component';
import { ActivityOtpVerificationComponent } from './activity-otp-verification/activity-otp-verification.component';

const routes: Routes = [{
  path: '',
  component: ActivitiesComponent
},
{
  path: 'detail/:id/:type',
  component: ActivityDetailComponent
},
{
  path: 'verifyOTP',
  component: ActivityOtpVerificationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }

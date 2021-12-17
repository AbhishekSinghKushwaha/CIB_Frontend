import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';

const routes: Routes = [
  { path: '', component: CustomerOnboardingComponent },
  { path: 'account', component: CustomerOnboardingAccountComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOnboardingRoutingModule {}

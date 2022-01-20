import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyDirectorsComponent } from './components/company-directors/add-company-directors/add-company-directors.component';
import { CompanyDirectorsComponent } from './components/company-directors/company-directors.component';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';
import { CustomerOnboardingShellComponent } from './customer-onboarding-shell/customer-onboarding-shell.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerOnboardingShellComponent,
    children: [
      { path: '', component: CustomerOnboardingComponent },
      { path: 'account', component: CustomerOnboardingAccountComponent },
      { path: 'company-directors', component: CompanyDirectorsComponent },
      { path: 'company-directors/add-new', component: AddCompanyDirectorsComponent },
      { path: 'company-directors/edit/:index', component: AddCompanyDirectorsComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOnboardingRoutingModule { }

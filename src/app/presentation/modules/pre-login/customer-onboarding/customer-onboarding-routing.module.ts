import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyDirectorsComponent } from './components/company-directors/add-company-directors/add-company-directors.component';
import { CompanyDirectorsComponent } from './components/company-directors/company-directors.component';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { CustomerOnboardingRegisterCompanyDetailsComponent } from './components/customer-onboarding-register-company-details/customer-onboarding-register-company-details.component';
import { CustomerOnboardingRegisterComponent } from './components/customer-onboarding-register/customer-onboarding-register.component';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';
import { CustomerOnboardingShellComponent } from './customer-onboarding-shell/customer-onboarding-shell.component';
import { TeamMembersAddComponent } from './components/team-members-add/team-members-add.component';
import { TeamMembersDetailsComponent } from './components/team-members-details/team-members-details.component';
import { TeamMembersRolesComponent } from './components/team-members-roles/team-members-roles.component';
import { NotificationPreferencesComponent } from './components/notification-preferences/notification-preferences.component';
import { AddTeamMembersComponent } from './components/notification-preferences/add-team-members/add-team-members.component';
import { RegisterTeamMembersComponent } from './components/register-team-members/register-team-members.component';

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
      { path: 'team-member-add', component: TeamMembersAddComponent },
      { path: 'team-member-detail', component: TeamMembersDetailsComponent },
      { path: 'team-member-roles', component: TeamMembersRolesComponent },
      { path: 'register', component: CustomerOnboardingRegisterComponent },
      {
        path: 'notification-preferences',
        component: NotificationPreferencesComponent,
      },
      { path: 'add-members', component: AddTeamMembersComponent },
      {
        path: 'register/company-details',
        component: CustomerOnboardingRegisterCompanyDetailsComponent,
      },
      { path: 'add-members/register', component: RegisterTeamMembersComponent },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOnboardingRoutingModule { }

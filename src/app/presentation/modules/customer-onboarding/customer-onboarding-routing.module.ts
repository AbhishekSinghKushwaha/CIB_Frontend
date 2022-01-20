import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyDirectorsComponent } from './components/company-directors/add-company-directors/add-company-directors.component';
import { CompanyDirectorsComponent } from './components/company-directors/company-directors.component';
import { CustomerOnboardingRegisterCompanyDetailsComponent } from './components/customer-onboarding-register-company-details/customer-onboarding-register-company-details.component';
import { AddTeamMembersComponent } from './components/notification-preferences/add-team-members/add-team-members.component';
import { NotificationPreferencesComponent } from './components/notification-preferences/notification-preferences.component';
import { TeamMembersAddComponent } from './components/team-members-add/team-members-add.component';
import { TeamMembersDetailsComponent } from './components/team-members-details/team-members-details.component';
import { TeamMembersRolesComponent } from './components/team-members-roles/team-members-roles.component';
import { CustomerOnboardingComponent } from './customer-onboarding.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerOnboardingComponent,
    children: [
      { path: 'company-directors', component: CompanyDirectorsComponent },
      {
        path: 'company-directors/add-new',
        component: AddCompanyDirectorsComponent,
      },
      {
        path: 'company-directors/edit/:index',
        component: AddCompanyDirectorsComponent,
      },
      { 
        path: 'team-members', 
        component: TeamMembersAddComponent 
      },
      { 
        path: 'team-members/add', 
        component: TeamMembersDetailsComponent 
      },
      { 
        path: 'team-members/edit/:index', 
        component: TeamMembersDetailsComponent 
      },
      { 
        path: 'team-members/roles', 
        component: TeamMembersRolesComponent 
      },
      {
        path: 'notification-preferences',
        component: NotificationPreferencesComponent,
      },
      { path: 'add-members', component: AddTeamMembersComponent },
      {
        path: 'register/company-details',
        component: CustomerOnboardingRegisterCompanyDetailsComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'register/company-details',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOnboardingRoutingModule {}

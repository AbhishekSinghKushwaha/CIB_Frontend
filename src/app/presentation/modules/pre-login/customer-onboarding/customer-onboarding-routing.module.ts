import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { CustomerOnboardingRegisterComponent } from './components/customer-onboarding-register/customer-onboarding-register.component';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';
import { TeamMembersAddComponent } from './components/team-members-add/team-members-add.component';
import { TeamMembersDetailsComponent } from './components/team-members-details/team-members-details.component';
import { TeamMembersRolesComponent } from './components/team-members-roles/team-members-roles.component';
import { NotificationPreferencesComponent } from './components/notification-preferences/notification-preferences.component'
import { AddTeamMembersComponent } from './components/notification-preferences/add-team-members/add-team-members.component';

const routes: Routes = [
  { path: '', component: CustomerOnboardingComponent },  
  { path: 'account', component: CustomerOnboardingAccountComponent },
  { path: 'team-member-add', component: TeamMembersAddComponent },
  { path: 'team-member-detail', component: TeamMembersDetailsComponent },
  { path: 'team-member-roles', component: TeamMembersRolesComponent },
  { path: 'register', component: CustomerOnboardingRegisterComponent },
  { 
    path: 'notification-preferences', 
    component: NotificationPreferencesComponent
  },
  { path: 'add-members', component: AddTeamMembersComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOnboardingRoutingModule {}

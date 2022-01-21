import { ContractDownloadComponent } from './components/contract-download/contract-download.component';
import { ProductServicesOptionsComponent } from './components/product-services/product-services-options/product-services-options.component';
import { AddProductServicesComponent } from './components/product-services/add-product-services/add-product-services.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyDirectorsComponent } from './components/company-directors/add-company-directors/add-company-directors.component';
import { CompanyDirectorsComponent } from './components/company-directors/company-directors.component';
import { CustomerOnboardingRegisterCompanyDetailsComponent } from './components/customer-onboarding-register-company-details/customer-onboarding-register-company-details.component';
import { AddTeamMembersComponent } from './components/notification-preferences/add-team-members/add-team-members.component';
import { NotificationPreferencesComponent } from './components/notification-preferences/notification-preferences.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamMembersDetailsComponent } from './components/team-members/team-members-details/team-members-details.component';
import { TeamMembersRolesComponent } from './components/team-members/team-members-roles/team-members-roles.component';
import { CustomerOnboardingComponent } from './customer-onboarding.component';
import { ProductServicesComponent } from './components/product-services/product-services.component';
import { RegistrationConfirmationComponent } from './components/registration-confirmation/registration-confirmation.component';
import { UploadDocumentsComponent } from './components/upload-documents/upload-documents.component';
import { SubmitSuccessfulComponent } from './components/submit-successful/submit-successful.component';

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
        component: TeamMembersComponent,
      },
      {
        path: 'team-members/add',
        component: TeamMembersDetailsComponent,
      },
      {
        path: 'team-members/edit/:index',
        component: TeamMembersDetailsComponent,
      },
      {
        path: 'team-members/roles',
        component: TeamMembersRolesComponent,
      },
      {
        path: 'product-services',
        component: ProductServicesComponent,
      },
      {
        path: 'product-services/add',
        component: AddProductServicesComponent,
      },
      {
        path: 'product-services/options',
        component: ProductServicesOptionsComponent,
      },
      {
        path: 'product-services/options/selection',
        component: NotificationPreferencesComponent,
      },
      { path: 'add-members', component: AddTeamMembersComponent },
      {
        path: 'register/company-details',
        component: CustomerOnboardingRegisterCompanyDetailsComponent,
      },

      {
        path: 'upload-documents',
        component: UploadDocumentsComponent,
      },
      {
        path: 'registration-confirmation',
        component: RegistrationConfirmationComponent,
      },
      { path: 'submit-successful', component: SubmitSuccessfulComponent },
      { path: 'contract-download', component: ContractDownloadComponent },
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDirectorsComponent } from './company-directors/company-directors.component';
import { AddCompanyDirectorComponent } from './components/add-company-director/add-company-director.component';
import { AddProductServiceComponent } from './components/add-product-service/add-product-service.component';
import { AddTeamMemberComponent } from './components/add-team-member/add-team-member.component';
import { ProductServiceOptionsComponent } from './components/product-service-options/product-service-options.component';
import { TeamMemberRolesComponent } from './components/team-member-roles/team-member-roles.component';
import { ProductServicesComponent } from './product-services/product-services.component';
import { RegisterCompanyDetailsComponent } from './register-company-details/register-company-details.component';
import { RegistrationStepsComponent } from './registration-steps.component';
import { RegistrationSummaryConfirmationComponent } from './registration-summary-confirmation/registration-summary-confirmation.component';
import { RegistrationSummaryDownloadComponent } from './registration-summary-download/registration-summary-download.component';
import { SubmissionSuccessfulComponent } from './submission-successful/submission-successful.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationStepsComponent,
    children: [
      {
        path: '',
        redirectTo: 'company-details',
        pathMatch: 'full',
      },
      {
        path: 'company-details',
        component: RegisterCompanyDetailsComponent,
      },
      {
        path: 'company-directors',
        component: CompanyDirectorsComponent,
      },
      {
        path: 'add-company-director',
        component: AddCompanyDirectorComponent,
      },
      {
        path: 'edit-company-director',
        component: AddCompanyDirectorComponent,
      },
      {
        path: 'team-members',
        component: TeamMembersComponent,
      },
      {
        path: 'add-team-member',
        component: AddTeamMemberComponent,
      },
      {
        path: 'edit-team-member',
        component: AddTeamMemberComponent,
      },
      {
        path: 'team-member-roles',
        component: TeamMemberRolesComponent,
      },
      {
        path: 'product-services',
        component: ProductServicesComponent,
      },
      {
        path: 'add-product-service',
        component: AddProductServiceComponent,
      },
      {
        path: 'edit-product-service/:id',
        component: ProductServiceOptionsComponent,
      },
      {
        path: 'product-service-options',
        component: ProductServiceOptionsComponent,
      },
      {
        path: 'registration-summary-confirmation',
        component: RegistrationSummaryConfirmationComponent,
      },
      {
        path: 'registration-summary-download',
        component: RegistrationSummaryDownloadComponent,
      },
      {
        path: 'upload-documents',
        component: UploadDocumentsComponent,
      },
      {
        path: 'submission-successful',
        component: SubmissionSuccessfulComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationStepsRoutingModule {}

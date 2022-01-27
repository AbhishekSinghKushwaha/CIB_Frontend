import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationStepsRoutingModule } from './registration-steps-routing.module';
import { RegistrationStepsComponent } from './registration-steps.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { RegisterCompanyDetailsComponent } from './register-company-details/register-company-details.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { CustomerOnboardingModalsModule } from 'src/app/presentation/shared/modals/customer-onboarding-modals/customer-onboarding-modals.module';
import { CompanyDirectorsComponent } from './company-directors/company-directors.component';
import { ProductServicesComponent } from './product-services/product-services.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { AddCompanyDirectorComponent } from './components/add-company-director/add-company-director.component';
import { TeamMembersComponent } from './team-members/team-members.component';
import { AddTeamMemberComponent } from './components/add-team-member/add-team-member.component';
import { TeamMemberRolesComponent } from './components/team-member-roles/team-member-roles.component';
import { AddProductServiceComponent } from './components/add-product-service/add-product-service.component';
import { ProductServiceOptionsComponent } from './components/product-service-options/product-service-options.component';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';
import { RegistrationSummaryConfirmationComponent } from './registration-summary-confirmation/registration-summary-confirmation.component';
import { RegistrationSummaryDownloadComponent } from './registration-summary-download/registration-summary-download.component';
import { SubmissionSuccessfulComponent } from './submission-successful/submission-successful.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    RegistrationStepsComponent,
    RegisterCompanyDetailsComponent,
    CompanyDirectorsComponent,
    ProductServicesComponent,
    UploadDocumentsComponent,
    AddCompanyDirectorComponent,
    TeamMembersComponent,
    AddTeamMemberComponent,
    TeamMemberRolesComponent,
    AddProductServiceComponent,
    ProductServiceOptionsComponent,
    RegistrationSummaryConfirmationComponent,
    RegistrationSummaryDownloadComponent,
    SubmissionSuccessfulComponent,
  ],
  imports: [
    CommonModule,
    RegistrationStepsRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    FormElementsModule,
    CustomerOnboardingModalsModule,
    PdfViewerModule,
  ],
  providers: [NotificationConstants],
})
export class RegistrationStepsModule {}

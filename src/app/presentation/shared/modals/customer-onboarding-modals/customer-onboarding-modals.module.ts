import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationRequirementsModalComponent } from './registration-requirements-modal/registration-requirements-modal.component';
import { CompanyDetailsModalComponent } from './company-details-modal/company-details-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ProductServiceConfirmationModalComponent } from './product-service-confirmation-modal/product-service-confirmation-modal.component';
import { TeamMembersConfirmationModalComponent } from './team-members-confirmation-modal/team-members-confirmation-modal.component';
import { DirectorConfirmationModalComponent } from './director-confirmation-modal/director-confirmation-modal.component';
import { CustomerOnboardingModalsService } from 'src/app/core/services/modal-services/customer-onboarding-modals.service';

@NgModule({
  declarations: [
    RegistrationRequirementsModalComponent,
    CompanyDetailsModalComponent,
    ProductServiceConfirmationModalComponent,
    TeamMembersConfirmationModalComponent,
    DirectorConfirmationModalComponent,
  ],
  imports: [CommonModule, MatStyleModule],
  providers: [CustomerOnboardingModalsService],
})
export class CustomerOnboardingModalsModule {}

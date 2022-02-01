import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { CompanyDetailsModalComponent } from 'src/app/presentation/shared/modals/customer-onboarding-modals/company-details-modal/company-details-modal.component';
import { ProductServiceConfirmationModalComponent } from 'src/app/presentation/shared/modals/customer-onboarding-modals/product-service-confirmation-modal/product-service-confirmation-modal.component';
import { RegistrationRequirementsModalComponent } from 'src/app/presentation/shared/modals/customer-onboarding-modals/registration-requirements-modal/registration-requirements-modal.component';

@Injectable({
  providedIn: 'root',
})
export class CustomerOnboardingModalsService {
  public showOnboarding: boolean;

  registrationModalRef: MatDialogRef<
    RegistrationRequirementsModalComponent,
    any
  >;
  productServiceModalRef: MatDialogRef<
    ProductServiceConfirmationModalComponent,
    any
  >;

  companyDetailsModalRef: MatDialogRef<CompanyDetailsModalComponent, any>;

  constructor(private readonly dialog: MatDialog) {}

  openRegistrationRequirementModal(requiredDocs: any) {
    this.registrationModalRef = this.dialog.open<
      RegistrationRequirementsModalComponent,
      any
    >(RegistrationRequirementsModalComponent, {
      maxWidth: '900px',
      disableClose: true,
      data: requiredDocs,
    });
    return this.registrationModalRef;
  }

  closeRegistrationModal() {
    this.registrationModalRef.close();
  }

  openCompanyDetailsModal(data: any) {
    this.companyDetailsModalRef = this.dialog.open<
      CompanyDetailsModalComponent,
      any
    >(CompanyDetailsModalComponent, {
      data,
      maxWidth: '60vw',
      disableClose: true,
    });
    return this.companyDetailsModalRef;
  }

  closeCompanyDetailsModal() {
    this.companyDetailsModalRef.close();
  }

  openServiceAndProducstModal() {
    this.productServiceModalRef = this.dialog.open<
      ProductServiceConfirmationModalComponent,
      any
    >(ProductServiceConfirmationModalComponent, {
      maxWidth: '800px',
      disableClose: true,
    });
    return this.productServiceModalRef;
  }

  closeServiceAndProducstModal() {
    this.productServiceModalRef.close();
  }
}

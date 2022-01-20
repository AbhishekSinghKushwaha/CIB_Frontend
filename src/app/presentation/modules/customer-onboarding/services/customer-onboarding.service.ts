import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CompanyDetailsSummaryComponent } from '../components/customer-onboarding-register-company-details/company-details-summary/company-details-summary.component';
import { CustomerOnboardingRegistrationModalComponent } from '../components/customer-onboarding-registration-modal/customer-onboarding-registration-modal.component';

@Injectable()
export class CustomerOnboardingService {
  public showOnboarding: boolean;

  registrationModal: MatDialogRef<
    CustomerOnboardingRegistrationModalComponent,
    any
  >;

  companyDetailsModal: MatDialogRef<CompanyDetailsSummaryComponent, any>;

  constructor(private readonly dialog: MatDialog) {}

  openRegistrationModal() {
    this.registrationModal = this.dialog.open<
      CustomerOnboardingRegistrationModalComponent,
      any
    >(CustomerOnboardingRegistrationModalComponent, {
      maxWidth: '900px',
      disableClose: true,
    });
    return this.registrationModal;
  }

  closeRegistrationModal() {
    this.registrationModal.close();
  }

  openCompanyDetailsModal(data: any) {
    this.companyDetailsModal = this.dialog.open<
      CompanyDetailsSummaryComponent,
      any
    >(CompanyDetailsSummaryComponent, {
      data,
      maxWidth: '900px',
      disableClose: true,
    });
    return this.companyDetailsModal;
  }

  closeCompanyDetailsModal() {
    this.companyDetailsModal.close();
  }
}

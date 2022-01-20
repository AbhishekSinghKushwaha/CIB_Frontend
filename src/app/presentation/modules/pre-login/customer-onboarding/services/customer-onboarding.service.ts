import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CustomerOnboardingRegistrationModalComponent } from '../components/customer-onboarding-registration-modal/customer-onboarding-registration-modal.component';

@Injectable()
export class CustomerOnboardingService {
  public showOnboarding: boolean;

  modal: MatDialogRef<CustomerOnboardingRegistrationModalComponent, any>;

  constructor(private readonly dialog: MatDialog) {}

  open() {
    this.modal = this.dialog.open<
      CustomerOnboardingRegistrationModalComponent,
      any
    >(CustomerOnboardingRegistrationModalComponent, {
      maxWidth: '900px',
      disableClose: true,
    });
    return this.modal;
  }

  close() {
    this.modal.close();
  }
}

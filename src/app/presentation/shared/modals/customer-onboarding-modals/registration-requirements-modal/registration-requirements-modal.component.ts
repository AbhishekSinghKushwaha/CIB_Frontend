import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerOnboardingModalsService } from 'src/app/core/services/modal-services/customer-onboarding-modals.service';

@Component({
  selector: 'app-registration-requirements-modal',
  templateUrl: './registration-requirements-modal.component.html',
  styleUrls: ['./registration-requirements-modal.component.scss'],
})
export class RegistrationRequirementsModalComponent implements OnInit {
  constructor(
    private readonly customerOnboardingService: CustomerOnboardingModalsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  close() {
    this.customerOnboardingService.closeRegistrationModal();
  }
}

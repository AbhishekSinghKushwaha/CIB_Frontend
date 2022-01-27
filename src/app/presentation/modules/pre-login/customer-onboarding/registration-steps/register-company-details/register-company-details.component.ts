import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';
import { CustomerOnboardingModalsService } from 'src/app/core/services/modal-services/customer-onboarding-modals.service';

@Component({
  selector: 'app-register-company-details',
  templateUrl: './register-company-details.component.html',
  styleUrls: ['./register-company-details.component.scss'],
})
export class RegisterCompanyDetailsComponent implements OnInit {
  companyDetailsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private onboardingModalService: CustomerOnboardingModalsService,
    private onboardingService: CustomerOnboardingService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.initForm();
    // Get registration requirements & pass to modal
  }

  getRegistrationRequirements() {
    this.onboardingModalService.openRegistrationRequirementModal();
    // this.onboardingService.
  }

  initForm() {
    this.companyDetailsForm = this.fb.group({
      registrationNumber: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      country: ['', [Validators.required]], // Replace with countryId in the payload
      phoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  saveAndContinue() {
    this.onboardingModalService.openCompanyDetailsModal(
      this.companyDetailsForm.getRawValue()
    );
  }
}

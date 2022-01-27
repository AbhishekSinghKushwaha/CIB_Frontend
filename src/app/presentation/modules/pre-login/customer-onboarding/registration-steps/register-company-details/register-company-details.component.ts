import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomerOnboardingModalsService } from 'src/app/core/services/modal-services/customer-onboarding-modals.service';

@Component({
  selector: 'app-register-company-details',
  templateUrl: './register-company-details.component.html',
  styleUrls: ['./register-company-details.component.scss'],
})
export class RegisterCompanyDetailsComponent implements OnInit {
  companyDetailsForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    registrationNumber: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
  });

  constructor(
    private customerOnboardingService: CustomerOnboardingModalsService
  ) {}

  ngOnInit(): void {
    this.customerOnboardingService.openRegistrationModal();
  }

  get companyDetailsControls() {
    return this.companyDetailsForm.controls;
  }

  saveAndContinue() {
    if (this.companyDetailsForm.invalid) {
      return;
    }

    const data = {
      name: this.companyDetailsControls.name.value,
      registrationNumber: this.companyDetailsControls.registrationNumber.value,
      country: this.companyDetailsControls.country.value,
      mobile: this.companyDetailsControls.mobile.value,
      email: this.companyDetailsControls.email.value,
      address: this.companyDetailsControls.address.value,
    };

    this.customerOnboardingService.openCompanyDetailsModal(data);
  }
}

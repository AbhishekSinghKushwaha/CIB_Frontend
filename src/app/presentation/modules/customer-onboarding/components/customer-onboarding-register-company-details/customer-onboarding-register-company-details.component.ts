import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerOnboardingService } from '../../services/customer-onboarding.service';

@Component({
  selector: 'app-customer-onboarding-register-company-details',
  templateUrl: './customer-onboarding-register-company-details.component.html',
  styleUrls: ['./customer-onboarding-register-company-details.component.scss'],
})
export class CustomerOnboardingRegisterCompanyDetailsComponent
  implements OnInit
{
  companyDetailsForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    registrationNumber: new FormControl(null, [Validators.required]),
    country: new FormControl(null, [Validators.required]),
    mobile: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
  });

  constructor(private customerOnboardingService: CustomerOnboardingService) {}

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

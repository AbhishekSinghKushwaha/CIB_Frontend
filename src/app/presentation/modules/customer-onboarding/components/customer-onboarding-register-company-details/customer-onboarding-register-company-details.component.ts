import { Component, OnInit } from '@angular/core';
import { CustomerOnboardingService } from '../../services/customer-onboarding.service';

@Component({
  selector: 'app-customer-onboarding-register-company-details',
  templateUrl: './customer-onboarding-register-company-details.component.html',
  styleUrls: ['./customer-onboarding-register-company-details.component.scss'],
})
export class CustomerOnboardingRegisterCompanyDetailsComponent
  implements OnInit
{
  constructor(private customerOnboardingService: CustomerOnboardingService) {}

  ngOnInit(): void {
    this.customerOnboardingService.open();
  }
}

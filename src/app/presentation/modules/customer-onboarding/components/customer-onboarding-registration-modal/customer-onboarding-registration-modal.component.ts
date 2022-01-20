import { Component, OnInit } from '@angular/core';
import { CustomerOnboardingService } from '../../services/customer-onboarding.service';

@Component({
  selector: 'app-customer-onboarding-registration-modal',
  templateUrl: './customer-onboarding-registration-modal.component.html',
  styleUrls: ['./customer-onboarding-registration-modal.component.scss'],
})
export class CustomerOnboardingRegistrationModalComponent implements OnInit {
  constructor(
    private readonly customerOnboardingService: CustomerOnboardingService
  ) {}

  ngOnInit(): void {}

  close() {
    this.customerOnboardingService.closeRegistrationModal();
  }
}

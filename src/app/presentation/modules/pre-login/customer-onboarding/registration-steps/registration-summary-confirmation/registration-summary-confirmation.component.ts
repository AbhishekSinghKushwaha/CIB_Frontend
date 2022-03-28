import { Component, OnInit } from '@angular/core';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-registration-summary-confirmation',
  templateUrl: './registration-summary-confirmation.component.html',
  styleUrls: ['./registration-summary-confirmation.component.scss'],
})
export class RegistrationSummaryConfirmationComponent implements OnInit {
  summary: any;
  constructor(
    private onboardingService: CustomerOnboardingService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getRegistrationSummary();
  }

  getRegistrationSummary() {
    this.onboardingService
      .getRegistrationSummary(this.storageService.getData('corporateId'))
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.summary = res.data;
        }
      });
  }
}

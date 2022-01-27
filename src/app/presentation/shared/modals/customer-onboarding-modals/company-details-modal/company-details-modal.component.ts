import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';
import { CustomerOnboardingModalsService } from 'src/app/core/services/modal-services/customer-onboarding-modals.service';

@Component({
  selector: 'app-company-details-modal',
  templateUrl: './company-details-modal.component.html',
  styleUrls: ['./company-details-modal.component.scss'],
})
export class CompanyDetailsModalComponent implements OnInit {
  constructor(
    private onboardingModalService: CustomerOnboardingModalsService,
    private onboardingService: CustomerOnboardingService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  close() {
    this.onboardingModalService.closeCompanyDetailsModal();
  }

  //  Save company details
  confirm() {
    let data = this.data;
    const countryId = data.country.id;
    delete data['country']; // Remove the country object
    const newPayload = { ...{ countryId }, ...data }; // Create a new payload with countryId only

    this.onboardingService
      .registerCompanyDetails(newPayload)
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.router.navigate([
            '/auth/customer-onboarding/register/company-directors',
          ]);
          // TODO:: Notify success
          this.onboardingModalService.closeCompanyDetailsModal();
        }
      });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerOnboardingModalsService } from 'src/app/core/services/modal-services/customer-onboarding-modals.service';

@Component({
  selector: 'app-company-details-modal',
  templateUrl: './company-details-modal.component.html',
  styleUrls: ['./company-details-modal.component.scss'],
})
export class CompanyDetailsModalComponent implements OnInit {
  constructor(
    private customerOnboardingService: CustomerOnboardingModalsService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  close() {
    this.customerOnboardingService.closeCompanyDetailsModal();
  }

  confirm() {
    this.customerOnboardingService.closeCompanyDetailsModal();

    this.router.navigate([
      '/auth/customer-onboarding/register/company-directors',
    ]);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CustomerOnboardingService } from '../../../services/customer-onboarding.service';

@Component({
  selector: 'app-company-details-summary',
  templateUrl: './company-details-summary.component.html',
  styleUrls: ['./company-details-summary.component.scss'],
})
export class CompanyDetailsSummaryComponent implements OnInit {
  constructor(
    private customerOnboardingService: CustomerOnboardingService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  close() {
    this.customerOnboardingService.closeCompanyDetailsModal();
  }

  confirm() {
    this.customerOnboardingService.closeCompanyDetailsModal();

    this.router.navigate(['customer-onboarding/company-directors']);
  }
}

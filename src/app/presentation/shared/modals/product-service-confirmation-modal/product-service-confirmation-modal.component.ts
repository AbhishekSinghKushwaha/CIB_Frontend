import { Router } from '@angular/router';
import { CustomerOnboardingService } from './../../../modules/customer-onboarding/services/customer-onboarding.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-service-confirmation-modal',
  templateUrl: './product-service-confirmation-modal.component.html',
  styleUrls: ['./product-service-confirmation-modal.component.scss']
})
export class ProductServiceConfirmationModalComponent implements OnInit {

  constructor(
    private customerOnboardingService: CustomerOnboardingService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  close() {
    this.customerOnboardingService.closeCompanyDetailsModal();
  }

  confirm() {
    this.customerOnboardingService.closeCompanyDetailsModal();

    this.router.navigate(['customer-onboarding/company-directors']);
  }

}

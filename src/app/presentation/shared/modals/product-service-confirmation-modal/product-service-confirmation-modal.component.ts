import { Router } from '@angular/router';
import { CustomerOnboardingService } from './../../../modules/customer-onboarding/services/customer-onboarding.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-service-confirmation-modal',
  templateUrl: './product-service-confirmation-modal.component.html',
  styleUrls: ['./product-service-confirmation-modal.component.scss']
})
export class ProductServiceConfirmationModalComponent implements OnInit {

  constructor(
    private customerOnboardingService: CustomerOnboardingService,
    private router: Router,
    private readonly dialogRef: MatDialogRef<ProductServiceConfirmationModalComponent>,
  ) { }

  ngOnInit() {
  }

  // close() {
  //   this.customerOnboardingService.closeServiceAndProducstModal();
  // }

  confirm() {
    // this.customerOnboardingService.closeServiceAndProducstModal();
    this.close()
    setTimeout(() => {
    this.router.navigate(['customer-onboarding/registration-confirmation']);
    }, 0)
  }

  close() {
    this.dialogRef.close();
  }
}

import { Router } from "@angular/router";

import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { CustomerOnboardingModalsService } from "src/app/core/services/modal-services/customer-onboarding-modals.service";

@Component({
  selector: "app-product-service-confirmation-modal",
  templateUrl: "./product-service-confirmation-modal.component.html",
  styleUrls: ["./product-service-confirmation-modal.component.scss"],
})
export class ProductServiceConfirmationModalComponent implements OnInit {
  constructor(
    private customerOnboardingService: CustomerOnboardingModalsService,
    private router: Router,
    private readonly dialogRef: MatDialogRef<ProductServiceConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public products: any
  ) {}

  ngOnInit() {
    console.log(this.products);
  }

  confirm() {
    // this.customerOnboardingService.closeServiceAndProducstModal();
    this.close();
    setTimeout(() => {
      this.router.navigate([
        "/auth/customer-onboarding/register/registration-summary-confirmation",
      ]);
    }, 0);
  }

  close() {
    this.dialogRef.close();
  }
}

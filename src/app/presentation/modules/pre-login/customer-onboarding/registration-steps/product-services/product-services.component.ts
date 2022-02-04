import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsAndServicesService } from 'src/app/core/services/customer-onboarding/products-and-services.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';
import { ProductServiceConfirmationModalComponent } from 'src/app/presentation/shared/modals/customer-onboarding-modals/product-service-confirmation-modal/product-service-confirmation-modal.component';

@Component({
  selector: 'app-product-services',
  templateUrl: './product-services.component.html',
  styleUrls: ['./product-services.component.scss'],
})
export class ProductServicesComponent implements OnInit {
  products: any[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private storageService: StorageService,
    private productsService: ProductsAndServicesService
  ) {}

  ngOnInit() {
    this.getProductsAndService();
  }

  @confirmModal({
    title: 'Are you sure',
    message:
      'Once you remove a team member, all their details will be deleted. You can add them again anytime.',
    cancelText: "No, I'm not",
    confirmText: "Yes, I'm sure",
  })
  delete(productId: string) {
    this.productsService
      .removeProductAndService(this.storageService.getData('corporateId'), {
        productIds: [productId],
      })
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.getProductsAndService();
        }
      });
  }

  getProductsAndService() {
    this.productsService
      .getCorporateProducts(this.storageService.getData('corporateId'))
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.products = res.data;
        }
      });
  }

  confirmTeamProductAndServices() {
    this.dialog.open<ProductServiceConfirmationModalComponent>(
      ProductServiceConfirmationModalComponent,
      { disableClose: true, data: this.products }
    );
  }
}

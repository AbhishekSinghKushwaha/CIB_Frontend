import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsAndServicesService } from 'src/app/core/services/customer-onboarding/products-and-services.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-add-product-service',
  templateUrl: './add-product-service.component.html',
  styleUrls: ['./add-product-service.component.scss'],
})
export class AddProductServiceComponent implements OnInit {
  products: any[];

  selectedProducts: any = [];

  payload: any[] = [];

  constructor(
    private storageService: StorageService,
    private router: Router,
    private productsService: ProductsAndServicesService
  ) {}

  ngOnInit() {
    this.products = this.storageService.getData('products-and-services');

    this.selectedProducts = this.storageService.getData('selected-service');

    console.log(this.selectedProducts);

    this.preparePayload();
  }

  selectProduct(product: any[]) {
    this.storageService.setData('product-services', product);
    this.router.navigate([
      '/auth/customer-onboarding/register/product-service-options',
    ]);
  }

  preparePayload() {
    if (this.selectedProducts && this.selectedProducts.length > 0) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        const product = this.selectedProducts[i];
        let serviceArray = [];

        for (let j = 0; j < product?.services.length; j++) {
          const service = product?.services[j];
          serviceArray.push(service.id);
          if (j + 1 == product?.services.length) {
            let payload = {
              productId: product.productId,
              services: serviceArray,
            };
            this.payload.push(payload);
          }
        }
      }
    } else {
    }
  }

  saveAndContinue() {
    this.productsService
      .addProductAndServiceToCorporate(
        { products: this.payload },
        this.storageService.getData('corporateId')
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.router.navigate([
            '/auth/customer-onboarding/register/product-services',
          ]);
        }
      });
  }
}

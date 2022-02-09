import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Product,
  ProductService,
} from 'src/app/core/domain/customer-onboarding.model';
import { ProductsAndServicesService } from 'src/app/core/services/customer-onboarding/products-and-services.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-add-product-service',
  templateUrl: './add-product-service.component.html',
  styleUrls: ['./add-product-service.component.scss'],
})
export class AddProductServiceComponent implements OnInit {
  products: any[];

  selectedProducts: Product[];

  payload: any[] = [];

  productId: any; // For edit purposes

  constructor(
    private storageService: StorageService,
    private router: Router,
    private productsService: ProductsAndServicesService,
    private route: ActivatedRoute
  ) {
    this.productId = this.route.snapshot.queryParamMap.get('id');
  }

  ngOnInit() {
    this.products = this.storageService.getData('products-and-services');
    this.listenToDataStreams();
  }

  listenToDataStreams() {
    this.productsService.selectedProducts$.subscribe((x) => {
      this.selectedProducts = x;
      this.preparePayload();
    });
  }

  selectProduct(product: Product) {
    this.productsService.selectProduct(product);
    this.router.navigate([
      '/auth/customer-onboarding/register/product-service-options',
    ]);
  }

  preparePayload() {
    if (this.selectedProducts?.length > 0) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        const product: Product = this.selectedProducts[i];
        let serviceArray = [];

        for (let j = 0; j < product.productServices.length; j++) {
          const service: ProductService = product.productServices[j];
          serviceArray.push(service.id);
          if (j + 1 == product.productServices.length) {
            let payload = {
              productId: product.id,
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
    this.addProducts();
  }

  addProducts() {
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

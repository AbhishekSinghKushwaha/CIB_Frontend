import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProduct, UserSubProduct } from 'src/app/core/domain/user.model';
import { ProductsAndServicesService } from 'src/app/core/services/customer-onboarding/products-and-services.service';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-corporate-user-products',
  templateUrl: './corporate-user-products.component.html',
  styleUrls: ['./corporate-user-products.component.scss']
})
export class CorporateUserProductsComponent implements OnInit {
  @Input() backLink: any;
  @Input() memberId: any;
  products: any[];
  selectedProducts: UserProduct[];
  payload: any[] = [];
  productId: any; // For edit purposes

  constructor(
    private storageService: StorageService,
    private router: Router,
    private productsService: ProductsAndServicesService<UserProduct, UserSubProduct>,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private dataLookup: DataLookupService
  ) {
  }

  ngOnInit() {
    this.getProductsAndServices();
    this.listenToDataStreams();
  }

  getProductsAndServices() {
    this.dataLookup.getProductsAndServices().userManagement.subscribe((res) => {
      if (res.isSuccessful) {
        this.storageService.setData("products-and-services", res.data);
        this.products = res.data;
        console.log('memberId', this.memberId)
      }
    });
  }

  listenToDataStreams() {
    this.productsService.selectedProducts$.subscribe((x) => {
      this.selectedProducts = x;
      this.preparePayload();
    });
  }

  selectProduct(product: UserProduct) {
    this.productsService.selectProduct(product);
    this.router.navigate([
      `${this.router.url}/options/${product.id}`
    ]);
  }

  preparePayload() {
    if (this.selectedProducts?.length > 0) {
      for (let i = 0; i < this.selectedProducts.length; i++) {
        const product: UserProduct = this.selectedProducts[i];
        let serviceArray = [];

        for (let j = 0; j < product?.subProducts?.length; j++) {
          const service: UserSubProduct = product?.subProducts[j];
          serviceArray.push(service.id);
          if (j + 1 == product.subProducts.length) {
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
        this.memberId
      )
      .subscribe((res) => {
        if (res.isSuccessful) {

          this.location.back();
        }
      });
  }
}

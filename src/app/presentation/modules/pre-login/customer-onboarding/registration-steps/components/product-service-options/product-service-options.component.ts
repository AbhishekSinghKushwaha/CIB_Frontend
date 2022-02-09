import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forEach } from 'lodash';
import {
  Product,
  ProductService,
} from 'src/app/core/domain/customer-onboarding.model';
import { ProductsAndServicesService } from 'src/app/core/services/customer-onboarding/products-and-services.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';

@Component({
  selector: 'app-product-service-options',
  templateUrl: './product-service-options.component.html',
  styleUrls: ['./product-service-options.component.scss'],
})
export class ProductServiceOptionsComponent implements OnInit {
  product: Product;

  selectedServices: ProductService[] = [];

  alreadySelectedProducts: Product[];

  productId: any;
  constructor(
    public readonly notificationDashboardList: NotificationConstants,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private productsServices: ProductsAndServicesService,
    private route: ActivatedRoute
  ) {
    this.productId = route.snapshot.queryParamMap.get('id');
  }

  ngOnInit(): void {
    this.listenToDataStreams();
  }

  listenToDataStreams() {
    this.productsServices.selectedProduct$.subscribe((x) => {
      this.product = x;

      console.log(this.productId);

      this.productId !== null ? this.mapEditProduct() : this.product;
    });

    this.productsServices.selectedProducts$.subscribe((x) => {
      this.alreadySelectedProducts = x;
      this.setAlreadySelectedServices();
    });
  }

  mapEditProduct() {
    const allProducts = this.storageService.getData('products-and-services');

    const selectedProduct = allProducts?.find((product: Product) => {
      return product.id === this.productId;
    });

    this.productsServices.selectedProducts([
      this.renameObjectKeys(this.product),
    ]);

    this.product = selectedProduct;
  }

  setAlreadySelectedServices() {
    if (
      this.alreadySelectedProducts?.length > 0 &&
      this.selectedServices?.length === 0
    ) {
      this.alreadySelectedProducts.forEach((service: Product) => {
        if (service.id === this.product.id) {
          this.selectedServices = service.productServices;
        }
      });
    } else {
      this.selectedServices = [];
    }
  }

  renameObjectKeys(product: any): Product {
    let isDone = false;
    product.id = product.productId;
    product.productServices = product.services;

    delete product.productId;
    product.services.forEach((service: any, i: number) => {
      service.id = service.serviceId;
      delete service.serviceid;

      if (i + 1 === product.services.length) {
        service.id = service.serviceId;
        delete service.serviceid;
        delete product.services;
        isDone = true;
      }
    });

    if (isDone) {
      this.productsServices.selectedProduct$ = product;
      return product;
    } else {
      return product;
    }
  }

  submit() {
    this.productId === null ? this.addProduct() : this.updateProduct();
  }

  toggle(serviceId: string) {
    if (this.isServiceActive(serviceId)) {
      const selectedServiceIndex = this.selectedServices.findIndex(
        (service: ProductService) => service.id === serviceId
      );
      this.selectedServices.splice(selectedServiceIndex, 1);
    } else {
      // Add the service to selected services array
      const selectedService = this.product?.productServices?.find(
        (service: ProductService) => {
          return service.id === serviceId;
        }
      );

      this.selectedServices.push(selectedService || {});
    }
  }

  isServiceActive(serviceId: string): boolean {
    const selectedService = this.selectedServices?.find(
      (service: ProductService) => {
        return service.id === serviceId;
      }
    );

    return selectedService ? true : false;
  }

  addProduct() {
    const existingProduct = this.alreadySelectedProducts.find(
      (product: Product) => {
        return product.id === this.product.id;
      }
    );

    let selectedProduct: Product = {
      productName: this.product.productName,
      id: this.product.id,
      description: this.product.description,
      productServices: this.selectedServices,
    };

    let newArrayOfServices = [];

    if (existingProduct) {
      const newArr: any[] = this.alreadySelectedProducts.map(
        (element: Product) => {
          if (element.id === this.product.id) {
            return selectedProduct;
          }
          return element;
        }
      );

      newArr.forEach((prod: Product, i: number) => {
        if (prod.productServices.length === 0) {
          newArr.splice(i, 1);
        }
      });

      this.productsServices.selectedProducts(newArr);
    } else {
      if (this.alreadySelectedProducts.length > 0) {
        newArrayOfServices = [...this.alreadySelectedProducts, selectedProduct];
        this.productsServices.selectedProducts(newArrayOfServices);
      } else {
        newArrayOfServices = [selectedProduct];
        this.productsServices.selectedProducts(newArrayOfServices);
      }
    }

    this.router.navigate([
      '/auth/customer-onboarding/register/add-product-service',
    ]);
  }

  updateProduct() {
    this.productId = null;
    let newArray = [];

    for (let i = 0; i < this.selectedServices.length; i++) {
      const element = this.selectedServices[i];
      newArray.push(element.id);
    }
    const payload = {
      productId: this.product.id,
      services: newArray,
    };

    this.productsServices
      .updateProductAndService(this.storageService.getData('corporateId'), {
        products: [payload],
      })
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.router.navigate([
            '/auth/customer-onboarding/register/product-services',
          ]);
        }
      });
  }
}

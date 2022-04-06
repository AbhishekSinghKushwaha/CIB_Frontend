import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProduct, UserSubProduct } from 'src/app/core/domain/user.model';
import { ProductsAndServicesService } from 'src/app/core/services/customer-onboarding/products-and-services.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';

@Component({
  selector: 'app-corporate-user-product-options',
  templateUrl: './corporate-user-product-options.component.html',
  styleUrls: ['./corporate-user-product-options.component.scss']
})
export class CorporateUserProductOptionsComponent implements OnInit {
  product: UserProduct;
  selectedSubproducts: UserSubProduct[] = [];
  alreadySelectedProducts: UserProduct[];

  productId: any;
  corporateId: any;
  constructor(
    public readonly notificationDashboardList: NotificationConstants,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly productsServices: ProductsAndServicesService<UserProduct, UserSubProduct>,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
  ) {
    this.productId = activatedRoute.snapshot.paramMap.get('productId');
    this.corporateId = activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.listenToDataStreams();
    setTimeout(() => {
      console.log('this.productId', this.productId);
      console.log('this.corporateId', this.corporateId);
    }, 2000);
  }

  listenToDataStreams() {
    this.productsServices.selectedProduct$.subscribe((x) => {
      this.product = x;
      this.productId !== null ? this.mapEditProduct() : this.product;
    });

    this.productsServices.selectedProducts$.subscribe((x) => {
      this.alreadySelectedProducts = x;
      this.setAlreadySelectedSubproducts();
    });
  }

  mapEditProduct() {
    const allProducts = this.storageService.getData('products-and-services');

    const selectedProduct = allProducts?.find((product: UserProduct) => {
      return product.id === this.productId;
    });

    this.productsServices.selectProducts([this.product]);

    this.product = selectedProduct;
  }

  setAlreadySelectedSubproducts() {
    if (
      this.alreadySelectedProducts?.length > 0 &&
      this.selectedSubproducts?.length === 0
    ) {
      this.alreadySelectedProducts.forEach((service: UserProduct) => {
        if (service.id === this.product.id) {
          this.selectedSubproducts = service.subProducts;
        }
      });
    } else {
      this.selectedSubproducts = [];
    }
  }

  // Unused function
  renameObjectKeys(product: any): UserProduct {
    let isDone = false;
    product.id = product.productId;
    product.subProducts = product.services;

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
      const selectedServiceIndex = this.selectedSubproducts.findIndex(
        (service: UserSubProduct) => service.id === serviceId
      );
      this.selectedSubproducts.splice(selectedServiceIndex, 1);
    } else {
      // Add the service to selected services array
      const selectedSubproduct = this.product?.subProducts?.find(
        (service: UserSubProduct) => {
          return service.id === serviceId;
        }
      );

      selectedSubproduct && this.selectedSubproducts.push(selectedSubproduct);
    }
  }

  isServiceActive(serviceId: string): boolean {
    const selectedService = this.selectedSubproducts?.find(
      (service: UserSubProduct) => {
        return service.id === serviceId;
      }
    );

    return selectedService ? true : false;
  }

  addProduct() {
    const existingProduct = this.alreadySelectedProducts.find(
      (product: UserProduct) => {
        return product.id === this.product.id;
      }
    );

    let selectedProduct: UserProduct = {
      ...this.product,
      subProducts: this.selectedSubproducts,
    };

    let newArrayOfServices = [];

    if (existingProduct) {
      const newArr: any[] = this.alreadySelectedProducts.map(
        (element: UserProduct) => {
          if (element.id === this.product.id) {
            return selectedProduct;
          }
          return element;
        }
      );

      newArr.forEach((prod: UserProduct, i: number) => {
        if (prod.subProducts.length === 0) {
          newArr.splice(i, 1);
        }
      });

      this.productsServices.selectProducts(newArr);
    } else {
      if (this.alreadySelectedProducts.length > 0) {
        newArrayOfServices = [...this.alreadySelectedProducts, selectedProduct];
        this.productsServices.selectProducts(newArrayOfServices);
      } else {
        newArrayOfServices = [selectedProduct];
        this.productsServices.selectProducts(newArrayOfServices);
      }
    }

    this.location.back();
  }

  updateProduct() {
    this.productId = null;
    let newArray = [];

    for (let i = 0; i < this.selectedSubproducts.length; i++) {
      const element = this.selectedSubproducts[i];
      newArray.push(element.id);
    }
    const payload = {
      productId: this.product.id,
      services: newArray,
    };

    this.productsServices
      .updateProductAndService(this.corporateId, {
        products: [payload],
      })
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.location.back();
        }
      });
  }

  goBack() {
    this.location.back();
  }
}

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Product, ProductService } from "src/app/core/domain/customer-onboarding.model";
import { ProductsAndServicesService } from "src/app/core/services/customer-onboarding/products-and-services.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { confirmModal } from "src/app/presentation/shared/decorators/confirm-dialog.decorator";
import { ProductServiceConfirmationModalComponent } from "src/app/presentation/shared/modals/customer-onboarding-modals/product-service-confirmation-modal/product-service-confirmation-modal.component";

@Component({
  selector: "app-product-services",
  templateUrl: "./product-services.component.html",
  styleUrls: ["./product-services.component.scss"],
})
export class ProductServicesComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private readonly dialog: MatDialog,
    private storageService: StorageService,
    private productsService: ProductsAndServicesService<Product, ProductService>,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProductsAndService();
  }

  @confirmModal({
    title: "Are you sure",
    message:
      "Once you remove a team member, all their details will be deleted. You can add them again anytime.",
    cancelText: "No, I'm not",
    confirmText: "Yes, I'm sure",
  })
  delete(product: any) {
    this.productsService
      .removeProductAndService(this.storageService.getData("corporateId"), {
        productIds: [product?.id],
      })
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.getProductsAndService();
        }
      });
  }

  edit(product: any) {
    // const formattedProduct = this.renameObjectKeys(product);

    this.productsService.selectProduct(product);
    this.router.navigate(
      ["/auth/customer-onboarding/register/product-service-options"],
      { queryParams: { id: product.id } }
    );
  }

  getProductsAndService() {
    this.productsService
      .getCorporateProducts(this.storageService.getData("corporateId"))
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.products = res.data;
          this.setSelectedProducts();
        }
      });
  }

  confirmTeamProductAndServices() {
    this.dialog.open<ProductServiceConfirmationModalComponent>(
      ProductServiceConfirmationModalComponent,
      { disableClose: true, data: this.products }
    );
  }

  renameObjectKeys(product: any): Product {
    let isDone = false;
    product.id = product.productId;
    product.productServices = product.services;

    delete product.productId;
    product?.services?.forEach((service: any, i: number) => {
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
      // this.productsServices.selectedProduct$ = product;
      return product;
    } else {
      return product;
    }
  }

  setSelectedProducts() {
    let newProdArray: Product[] = [];
    this.products.forEach((product: any, i: number) => {
      newProdArray.push(this.renameObjectKeys(product));

      if (i + 1 === this.products.length) {
        this.productsService.selectProducts(newProdArray);
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';

@Component({
  selector: 'app-product-service-options',
  templateUrl: './product-service-options.component.html',
  styleUrls: ['./product-service-options.component.scss'],
})
export class ProductServiceOptionsComponent implements OnInit {
  product: any;

  selectedServices: any[];
  constructor(
    public readonly notificationDashboardList: NotificationConstants,
    private readonly router: Router,
    private readonly storageService: StorageService
  ) {
    this.selectedServices = [];
  }

  ngOnInit(): void {
    this.product = this.storageService.getData('product-services');
    this.setAlreadySelectedServices();
  }

  setAlreadySelectedServices() {
    const myservice = this.storageService.getData('selected-service');

    if (myservice && this.selectedServices.length === 0) {
      myservice.forEach((service: any) => {
        if (service.productId === this.product.id) {
          this.selectedServices = service.services;
        }
      });
    } else {
      this.selectedServices = [];
    }
  }

  submit() {
    // Update only services if the product already exists
    const myservice = this.storageService.getData('selected-service');

    const existingProduct = myservice?.find((product: any) => {
      return product.productId === this.product.id;
    });

    let selectedService = {
      productId: this.product.id,
      services: this.selectedServices,
    };

    let newArrayOfServices = [];

    if (existingProduct) {
      const newArr: any[] = myservice.map((element: any) => {
        console.log(element);
        if (element.productId === this.product.id) {
          return selectedService;
        }
        return element;
      });

      newArr.forEach((prod: any, i: number) => {
        if (prod.services.length === 0) {
          newArr.splice(i, 1);
        }
      });

      this.storageService.setData('selected-service', newArr);
    } else {
      myservice !== null
        ? (newArrayOfServices = [...myservice, selectedService])
        : (newArrayOfServices = [selectedService]);
      this.storageService.removeData('selected-service');
      this.storageService.setData('selected-service', newArrayOfServices);
    }

    this.router.navigate([
      '/auth/customer-onboarding/register/add-product-service',
    ]);
  }

  toggle(serviceId: string) {
    if (this.isServiceActive(serviceId)) {
      const selectedServiceIndex = this.selectedServices.findIndex(
        (service: any) => service.id === serviceId
      );
      this.selectedServices.splice(selectedServiceIndex, 1);
    } else {
      // Add the service to selected services array
      const selectedService = this.product.productServices.find(
        (service: any) => {
          return service.id === serviceId;
        }
      );

      this.selectedServices.push(selectedService);
    }
  }

  isServiceActive(serviceId: string): boolean {
    const selectedService = this.selectedServices.find((service: any) => {
      return service.id === serviceId;
    });

    return selectedService ? true : false;
  }
}

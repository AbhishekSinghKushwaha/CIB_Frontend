import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { DataLookupService } from 'src/app/core/services/data-lookup/data-lookup.service';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-onboarding-steps',
  templateUrl: './onboarding-steps.component.html',
  styleUrls: ['./onboarding-steps.component.scss'],
})
export class OnboardingStepsComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private readonly spinnerService: SpinnerService,
    private storageService: StorageService,
    private dataLookup: DataLookupService
  ) {}

  ngOnInit(): void {
    this.loadingListener();
    this.getRoles();
    this.getCountries();
    this.getProductsAndServices();
  }

  loadingListener(): void {
    this.spinnerService.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading: boolean) => {
        this.loading = loading;
      });
  }

  // Get roles
  getRoles() {
    this.dataLookup.getRoles().subscribe((res) => {
      if (res.isSuccessful) {
        this.storageService.setData('onboarding-roles', res.data);
      }
    });
  }

  // Get Countries
  getCountries() {
    this.dataLookup.getCountries().subscribe((res) => {
      if (res.isSuccessful) {
        this.storageService.setData('countries', res.data);
      }
    });
  }

  getProductsAndServices() {
    this.dataLookup.getProductsAndServices().subscribe((res) => {
      if (res.isSuccessful) {
        this.storageService.setData('products-and-services', res.data);
      }
    });
  }
}

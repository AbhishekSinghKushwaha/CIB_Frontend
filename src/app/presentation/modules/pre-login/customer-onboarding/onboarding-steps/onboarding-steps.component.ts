import { Component, OnInit } from "@angular/core";
import { DataLookupService } from "src/app/core/services/data-lookup/data-lookup.service";
import { StorageService } from "src/app/core/services/storage/storage.service";

@Component({
  selector: "app-onboarding-steps",
  templateUrl: "./onboarding-steps.component.html",
  styleUrls: ["./onboarding-steps.component.scss"],
})
export class OnboardingStepsComponent implements OnInit {
  loading: boolean = false;
  constructor(
    private storageService: StorageService,
    private dataLookup: DataLookupService
  ) { }

  ngOnInit(): void {
    this.getRoles();
    this.getCountries();
    this.getProductsAndServices();
  }

  // Get roles
  getRoles() {
    this.dataLookup.getRoles().onboarding.subscribe((res) => {
      if (res.isSuccessful) {
        this.storageService.setData("onboarding-roles", res.data);
      }
    });
  }

  // Get Countries
  getCountries() {
    this.dataLookup.getCountries().subscribe((res) => {
      if (res.status) {
        this.storageService.setData("countries", res.data);
      }
    });
  }

  getProductsAndServices() {
    this.dataLookup.getProductsAndServices().onboarding.subscribe((res) => {
      if (res.isSuccessful) {
        this.storageService.setData("products-and-services", res.data);
      }
    });
  }
}

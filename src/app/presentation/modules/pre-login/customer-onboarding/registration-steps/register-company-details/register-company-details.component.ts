import { AfterViewInit, Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { CustomerOnboardingService } from "src/app/core/services/customer-onboarding/customer-onboarding.service";
import { DataLookupService } from "src/app/core/services/data-lookup/data-lookup.service";
import { CustomerOnboardingModalsService } from "src/app/core/services/modal-services/customer-onboarding-modals.service";
import { SharedDataService } from "src/app/core/services/shared-data/shared-data.service";
import { StorageService } from "src/app/core/services/storage/storage.service";

@Component({
  selector: "app-register-company-details",
  templateUrl: "./register-company-details.component.html",
  styleUrls: ["./register-company-details.component.scss"],
})
export class RegisterCompanyDetailsComponent implements OnInit {
  companyDetailsForm: FormGroup;

  disableRegNumber = true;

  constructor(
    private fb: FormBuilder,
    private onboardingModalService: CustomerOnboardingModalsService,
    private onboardingService: CustomerOnboardingService,
    private dataLookupService: DataLookupService,
    private sharedService: SharedDataService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    // Initialize form
    this.initForm();

    const regNumber = this.storageService.getData("registrationNumber");
    this.companyDetailsForm.controls.registrationNumber.setValue(regNumber);
    // Get registration requirements & pass to modal
    // this.getRegistrationRequirements();
  }

  getRegistrationRequirements() {
    // TODO:: Check for the process, if is first time reg, display, if not, ignore
    this.onboardingService.getRegistrationRequirements().subscribe((res) => {
      if (res.isSuccessful) {
        const requiredDocs = res.data;
        this.onboardingModalService.openRegistrationRequirementModal(
          requiredDocs
        );
      }
    });
  }

  initForm() {
    this.companyDetailsForm = this.fb.group({
      registrationNumber: ["", [Validators.required]],
      companyName: ["", [Validators.required]],
      country: ["", [Validators.required]], // Replace with countryId in the payload
      phoneNumber: ["", [Validators.required]],
      emailAddress: ["", [Validators.required, Validators.email]],
      address: ["", [Validators.required]],
    });
  }

  saveAndContinue() {
    this.onboardingModalService.openCompanyDetailsModal(
      this.companyDetailsForm.getRawValue()
    );
  }

  getCountries() {
    this.dataLookupService.getCountries().subscribe((res) => {
      if (res.isSuccessful) {
        this.sharedService.setCountries(res.data);
      }
    });
  }
}

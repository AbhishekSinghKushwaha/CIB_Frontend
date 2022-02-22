import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UniversalValidators } from "ngx-validators";
import { CustomerOnboardingService } from "src/app/core/services/customer-onboarding/customer-onboarding.service";
import { DirectorsService } from "src/app/core/services/customer-onboarding/directors.service";
import { StorageService } from "src/app/core/services/storage/storage.service";
import { PhoneNumberUtil } from "google-libphonenumber";
import { CountryService } from "src/app/core/services/modal-services/country.service";
import { CountryModel } from "src/app/core/domain/bank.model";
@Component({
  selector: "app-add-company-director",
  templateUrl: "./add-company-director.component.html",
  styleUrls: ["./add-company-director.component.scss"],
})
export class AddCompanyDirectorComponent implements OnInit {
  addDirectorForm: FormGroup;
  editMode: boolean;
  index: number;

  directorReferenceId: any;
  phoneUtil: any;

  selectedCountry: CountryModel;

  initialOfficeNumber: string;
  initialPhoneNumber: string;
  constructor(
    private readonly route: ActivatedRoute,
    private directorsService: DirectorsService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private countryService: CountryService
  ) {
    this.directorReferenceId = route.snapshot.queryParamMap.get("id");
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  ngOnInit(): void {
    this.initForm();
    this.getDirectorDetails();
  }

  getDirectorDetails() {
    if (this.directorReferenceId) {
      this.directorsService
        .getCompanyDirectorDetails(this.directorReferenceId)
        .subscribe((res) => {
          if (res.isSuccessful) {
            this.initialOfficeNumber = res.data?.officePhoneNumber;

            this.initialPhoneNumber = res.data?.phoneNumber;

            this.addDirectorForm.patchValue(res.data);

            // This is where i need to patch the phone numbers
            this.addDirectorForm.controls.phoneNumber.patchValue(
              this.formatPhoneNumber(res.data?.phoneNumber)
            );
            this.addDirectorForm.controls.officePhoneNumber.patchValue(
              this.formatPhoneNumber(res.data?.officePhoneNumber)
            );
          }
        });
    }
  }

  formatPhoneNumber(number: any): string {
    const countries = this.storageService.getData("countries");
    const countryCode = this.phoneUtil.parse("+" + number, "").getCountryCode();

    const country = countries.filter((v: CountryModel) => {
      return v.dialCode === countryCode.toString();
    });

    // this.countryService.selectCountry(country[0]);
    this.selectedCountry = country[0];

    return number.replace(countryCode, "").trim();
  }

  private initForm(): void {
    this.addDirectorForm = this.fb.group({
      name: ["", [Validators.required]],
      officePhoneNumber: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      emailAddress: ["", [Validators.required, Validators.email]],
    });
  }

  submit() {
    this.directorReferenceId !== null
      ? this.updateDirector()
      : this.addDirector();
  }

  addDirector() {
    this.directorsService
      .addDirector(
        this.addDirectorForm.getRawValue(),
        this.storageService.getData("corporateId")
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          // TODO:: Notify success
          this.router.navigate([
            "/auth/customer-onboarding/register/company-directors",
          ]);
        }
      });
  }

  updateDirector() {
    if (!this.addDirectorForm.get("phoneNumber")?.dirty) {
      this.addDirectorForm.controls.phoneNumber.setValue(
        this.initialPhoneNumber
      );
    }

    if (!this.addDirectorForm.get("officePhoneNumber")?.dirty) {
      this.addDirectorForm.controls.officePhoneNumber.setValue(
        this.initialOfficeNumber
      );
    }

    this.directorsService
      .updateDirectorDetails(
        this.addDirectorForm.getRawValue(),
        this.directorReferenceId
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.router.navigate([
            "/auth/customer-onboarding/register/company-directors",
          ]);
        }
      });
  }
}

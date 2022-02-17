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
  constructor(
    private readonly route: ActivatedRoute,
    private directorsService: DirectorsService,
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService
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
            this.addDirectorForm.patchValue(res.data);
            this.addDirectorForm.controls.phoneNumber.patchValue(
              res.data.phoneNumber.replace("+", "")
            );
            this.addDirectorForm.controls.officePhoneNumber.patchValue(
              res.data?.officePhoneNumber?.replace("+", "")
            );
          }
        });
    }
  }

  editPhoneNumber(phoneNo: any) {
    console.log(this.phoneUtil.getRegionCodeForNumber(phoneNo));
  }

  private initForm(data?: any): void {
    this.addDirectorForm = this.fb.group({
      name: ["", [Validators.required]],
      officePhoneNumber: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      emailAddress: ["", [Validators.required, Validators.email]],
    });
  }

  submit() {
    console.log(this.directorReferenceId);
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

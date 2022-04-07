import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryModel } from 'src/app/core/domain/bank.model';
import { LoggedinUserModel, UserFormPropModel, UserModel, UserProduct, UserSubProduct } from 'src/app/core/domain/user.model';
import { TeamMembersService } from 'src/app/core/services/customer-onboarding/team-members.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { ProductsAndServicesService } from 'src/app/core/services/customer-onboarding/products-and-services.service';

@Component({
  selector: 'app-corporate-user-form',
  templateUrl: './corporate-user-form.component.html',
  styleUrls: ['./corporate-user-form.component.scss']
})
export class CorporateUserFormComponent implements OnInit {
  // userListLink:/auth/customer-onboarding/register/team-members
  // addRoleLink:/auth/customer-onboarding/register/team-member-roles
  user: LoggedinUserModel;
  private _data: UserFormPropModel
  @Input() set data(input: UserFormPropModel) {
    this._data = input;
    this.getUser();
  }
  get data() {
    return this._data;
  }

  teamMemberDetailsForm: FormGroup;
  rolesAdded: boolean = false;
  phoneUtil: any;
  selectedCountry: CountryModel;
  initialOfficeNumber: any;
  initialPhoneNumber: any;
  intialValues: any;
  selectedSubproducts = [];
  selectedRoles: any[]

  constructor(
    private readonly fb: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private teamMembersService: TeamMembersService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly productsServices: ProductsAndServicesService<UserProduct, UserSubProduct>,
  ) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
    this.user = this.authService.userState;
  }

  ngOnInit() {
    this.initForm();
    this.checkRoles();
    this.setUser();
    this.selectedSubproducts = this.storageService.getData('selected-subproducts') || [];
  }

  setUser() {
    this.teamMembersService.selectedUser$.subscribe((x) => {
      if (Object.keys(x).length > 0) {
        this.teamMemberDetailsForm.setValue(x);

        this.initialOfficeNumber = x.officePhoneNumber;
        this.initialPhoneNumber = x.phoneNumber;

        this.teamMemberDetailsForm.controls.officePhoneNumber.setValue(
          this.formatPhoneNumber(x.officePhoneNumber)
        );

        this.teamMemberDetailsForm.controls.phoneNumber.setValue(
          this.formatPhoneNumber(x.phoneNumber)
        );
      } else {
      }
    });
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

  getUser() {
    if (this.data.username) {
      this.teamMembersService
        .getTeamMemberDetails(this.data.username)
        .subscribe((res) => {
          if (res.isSuccessful) {
            this.teamMemberDetailsForm.controls.idNumber.patchValue(
              res.data.identityNumber
            );
            this.teamMemberDetailsForm.patchValue(res.data);

            this.initialOfficeNumber = res.data.officePhoneNumber;
            this.initialPhoneNumber = res.data.phoneNumber;

            this.teamMemberDetailsForm.controls.officePhoneNumber.setValue(
              this.formatPhoneNumber(this.initialOfficeNumber)
            );

            this.teamMemberDetailsForm.controls.phoneNumber.setValue(
              this.formatPhoneNumber(this.initialPhoneNumber)
            );

            if (!this.storageService.getData('selected-subproducts')) {
              this.selectedSubproducts = res.data.subProducts;
              this.storageService.setData('selected-subproducts', this.selectedSubproducts);
            }
            if (!this.storageService.getData('selected-roles')) {
              this.selectedRoles = res.data.permissions;
              this.storageService.setData('selected-roles', res.data.permissions);
            }

          }
        });
    }
  }

  initForm() {
    this.teamMemberDetailsForm = this.fb.group({
      name: ["", [Validators.required]],
      phoneNumber: ["", [Validators.required]],
      emailAddress: ["", [Validators.required, Validators.email]],
      idNumber: ["", [Validators.required]],
      officePhoneNumber: ["", [Validators.required]],
      permissionIds: [[]],
    });
  }

  checkRoles() {
    this.selectedRoles = this.storageService.getData("selected-roles");
    this.selectedRoles?.length && this.formatRolesPayload();
  }

  persistForm() {

    if (this.data.username) {
      this.teamMemberDetailsForm.controls.phoneNumber.setValue(
        this.initialPhoneNumber
      );

      this.teamMemberDetailsForm.controls.officePhoneNumber.setValue(
        this.initialOfficeNumber
      );
    }
    this.teamMembersService.setUser(this.teamMemberDetailsForm.getRawValue());
  }

  openProducts() {
    this.persistForm();
    this.router.navigate(
      [this.data.addProductLink],
      { relativeTo: this.activatedRoute }
    );
  }

  addRoles() {
    this.persistForm();
    this.router.navigate(
      [this.data.addRoleLink],
      { relativeTo: this.activatedRoute }
    );
  }

  formatRolesPayload() {
    this.teamMemberDetailsForm.controls.permissionIds.setValue(this.selectedRoles.map(x => x.id));
  }

  addTeamMember() {
    if (!this.teamMemberDetailsForm.get("phoneNumber")?.dirty) {
      this.teamMemberDetailsForm.controls.phoneNumber.setValue(
        this.initialPhoneNumber
      );
    }

    if (!this.teamMemberDetailsForm.get("officePhoneNumber")?.dirty) {
      this.teamMemberDetailsForm.controls.officePhoneNumber.setValue(
        this.initialOfficeNumber
      );
    }

    const teamMember = { ...this.teamMemberDetailsForm.getRawValue(), notificationOption: 'SMS' };
    this.teamMembersService
      .addTeamMember(teamMember)
      .userManagement
      .subscribe((res: any) => {
        if (res.isSuccessful) {
          this.submitRoles()
        }
      });
  }

  submit() {
    this.data.username ? this.updateTeamMember() : this.addTeamMember();
  }

  updateTeamMember() {
    if (!this.teamMemberDetailsForm.get("phoneNumber")?.dirty) {
      this.teamMemberDetailsForm.controls.phoneNumber.setValue(
        this.initialPhoneNumber
      );
    }

    if (!this.teamMemberDetailsForm.get("officePhoneNumber")?.dirty) {
      this.teamMemberDetailsForm.controls.officePhoneNumber.setValue(
        this.initialOfficeNumber
      );
    }
    const teamMember = { ...this.teamMemberDetailsForm.getRawValue(), notificationOption: 'SMS' };
    this.teamMembersService
      .updateTeamMemberDetails(
        teamMember,
      )
      .userManagement(this.data.username)
      .subscribe((res: any) => {
        if (res.isSuccessful) {
          this.submitRoles()
        }
      });
  }

  submitRoles() {
    this.productsServices
      .addRoleToCorporate({ permissionIds: this.selectedRoles.map(x => x.id) }, this.data.username)
      .subscribe((res: any) => {
        if (res.isSuccessful) {
          this.storageService.removeData("selected-roles");
          this.teamMembersService.setUser({});
          this.storageService.removeData('selected-subproducts');
          this.router.navigate([
            this.data.userListLink,
          ]);
        }
      });

  }
}

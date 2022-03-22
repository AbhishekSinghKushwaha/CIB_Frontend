import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryModel } from 'src/app/core/domain/bank.model';
import { UserFormPropModel, UserModel } from 'src/app/core/domain/user.model';
import { TeamMembersService } from 'src/app/core/services/customer-onboarding/team-members.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-corporate-user-form',
  templateUrl: './corporate-user-form.component.html',
  styleUrls: ['./corporate-user-form.component.scss']
})
export class CorporateUserFormComponent implements OnInit {
  // userListLink:/auth/customer-onboarding/register/team-members
  // addRoleLink:/auth/customer-onboarding/register/team-member-roles
  user: UserModel;
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

  constructor(
    private readonly fb: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private teamMembersService: TeamMembersService,
    private readonly router: Router,
  ) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
  }

  ngOnInit() {
    this.initForm();

    this.checkRoles();

    this.setUser();
  }

  setUser() {
    this.teamMembersService.selectedUser$.subscribe((x) => {
      console.log('selectedUser', x);
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
    if (this.data.memberId) {
      this.teamMembersService
        .getTeamMemberDetails(this.data.memberId)
        .subscribe((res) => {
          console.log('user detail', res);
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
      transactionLimit: ["", [Validators.required]],
      roles: [[]],
    });
  }

  checkRoles() {
    let roles: any[] = this.storageService.getData("selected-roles");
    roles?.length > 0
      ? ((this.rolesAdded = true), this.formatRolesPayload(roles))
      : (this.rolesAdded = false);
  }

  addRoles() {
    if (this.data.memberId) {
      this.teamMemberDetailsForm.controls.phoneNumber.setValue(
        this.initialPhoneNumber
      );

      this.teamMemberDetailsForm.controls.officePhoneNumber.setValue(
        this.initialOfficeNumber
      );
    }
    this.teamMembersService.setUser(this.teamMemberDetailsForm.getRawValue());
    this.router.navigate(
      [this.data.addRoleLink],
      { queryParams: { id: this.data.memberId } }
    );
  }

  formatRolesPayload(roles: any[]) {
    let permissions = [];

    for (let i = 0; i < roles.length; i++) {
      let rol = roles[i].permissions;

      for (let j = 0; j < rol.length; j++) {
        permissions.push(rol[j].id);
      }
    }
    this.teamMemberDetailsForm.controls.roles.setValue(permissions);
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

    const teamMember = this.teamMemberDetailsForm.getRawValue()
    console.log('teamMember', teamMember);
    this.teamMembersService
      .addTeamMember(
        teamMember,
        this.storageService.getData("corporateId")
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.storageService.removeData("selected-roles");
          this.teamMembersService.setUser({});
          this.router.navigate([
            this.data.userListLink,
          ]);
        }
      });
  }

  submit() {
    this.data.memberId ? this.updateTeamMember() : this.addTeamMember();
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
    this.teamMembersService
      .updateTeamMemberDetails(
        this.teamMemberDetailsForm.getRawValue(),
        this.data.memberId
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.storageService.removeData("selected-roles");
          this.router.navigate([
            this.data.userListLink,
          ]);
        }
      });
  }
}

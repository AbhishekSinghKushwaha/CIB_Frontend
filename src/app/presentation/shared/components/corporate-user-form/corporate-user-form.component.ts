import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PhoneNumberUtil } from 'google-libphonenumber';
import { CountryModel } from 'src/app/core/domain/bank.model';
import { LoggedinUserModel, UserFormPropModel, UserModel } from 'src/app/core/domain/user.model';
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

  constructor(
    private readonly fb: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private teamMembersService: TeamMembersService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.phoneUtil = PhoneNumberUtil.getInstance();
    this.user = this.authService.userState;
  }

  ngOnInit() {
    this.initForm();

    this.checkRoles();

    this.setUser();

    console.log('Form State', this.teamMembersService.getUser())
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
    if (this.data.username) {
      this.teamMembersService
        .getTeamMemberDetails(this.data.username)
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
      permissionIds: [[]],
    });
  }

  checkRoles() {
    let roles: any[] = this.storageService.getData("selected-roles");
    if (roles?.length > 0) {
      this.rolesAdded = true;
      this.formatRolesPayload(roles);
    } else {
      this.rolesAdded = false;
    }
    console.log('roles', roles)
  }

  addRoles() {
    if (this.data.username) {
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
      { relativeTo: this.activatedRoute }
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
    this.teamMemberDetailsForm.controls.permissionIds.setValue(permissions);
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
    console.log('teamMember', teamMember);
    this.teamMembersService
      .addTeamMember(teamMember)
      .userManagement
      .subscribe((res: any) => {
        console.log('addTeamMember', res);
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
    console.log('teamMember', teamMember);
    this.teamMembersService
      .updateTeamMemberDetails(
        teamMember,
      )
      .userManagement(this.data.username)
      .subscribe((res: any) => {
        console.log('updateTeamMember', res);
        if (res.isSuccessful) {
          this.storageService.removeData("selected-roles");
          this.router.navigate([
            this.data.userListLink,
          ]);
        }
      });
  }
}

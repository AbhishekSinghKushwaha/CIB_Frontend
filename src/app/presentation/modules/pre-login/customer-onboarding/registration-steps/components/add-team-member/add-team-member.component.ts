import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/core/domain/customer-onboarding.model';
import { TeamMembersService } from 'src/app/core/services/customer-onboarding/team-members.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.scss'],
})
export class AddTeamMemberComponent implements OnInit {
  teamMemberDetailsForm: FormGroup;

  rolesAdded: boolean = false;

  memberId: any;

  constructor(
    private readonly fb: FormBuilder,
    private storageService: StorageService,
    private teamMembersService: TeamMembersService,
    private readonly router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.memberId = this.activatedRoute.snapshot.queryParamMap.get('id');
  }

  ngOnInit(): void {
    this.initForm();

    this.checkRoles();

    this.getUser();
  }

  getUser() {
    if (this.memberId) {
      this.teamMembersService
        .getTeamMemberDetails(this.memberId)
        .subscribe((res) => {
          if (res.isSuccessful) {
            this.teamMemberDetailsForm.controls.idNumber.patchValue(
              res.data.identityNumber
            );
            this.teamMemberDetailsForm.patchValue(res.data);
            console.log(res);
          }
        });
    }
  }

  initForm() {
    this.teamMemberDetailsForm = this.fb.group({
      name: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      emailAddress: ['', [Validators.required, Validators.email]],
      idNumber: ['', [Validators.required]],
      officePhoneNumber: ['', [Validators.required]],
      transactionLimit: ['', [Validators.required]],
      roles: [[]],
    });
  }

  checkRoles() {
    let roles: any[] = this.storageService.getData('selected-roles');
    roles?.length > 0
      ? ((this.rolesAdded = true), this.formatRolesPayload(roles))
      : (this.rolesAdded = false);
  }

  addRoles() {
    // this.teamMemberDetailsForm.valid ? this.storageService.setData('team-member', this.teamMemberDetailsForm.getRawValue)
    this.router.navigate([
      '/auth/customer-onboarding/register/team-member-roles',
    ]);
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
    this.teamMembersService
      .addTeamMember(
        this.teamMemberDetailsForm.getRawValue(),
        this.storageService.getData('corporateId')
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.storageService.removeData('selected-roles');
          this.router.navigate([
            '/auth/customer-onboarding/register/team-members',
          ]);
        }
      });
  }

  submit() {
    this.memberId ? this.updateTeamMember() : this.addTeamMember();
  }

  updateTeamMember() {
    this.teamMembersService
      .updateTeamMemberDetails(
        this.teamMemberDetailsForm.getRawValue(),
        this.memberId
      )
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.storageService.removeData('selected-roles');
          this.router.navigate([
            '/auth/customer-onboarding/register/team-members',
          ]);
        }
      });
  }
}

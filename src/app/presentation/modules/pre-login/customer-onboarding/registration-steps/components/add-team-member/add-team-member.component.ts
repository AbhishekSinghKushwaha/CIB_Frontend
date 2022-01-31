import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(
    private readonly fb: FormBuilder,
    private storageService: StorageService,
    private teamMembersService: TeamMembersService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.checkRoles();
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
      ? ((this.rolesAdded = true),
        this.teamMemberDetailsForm.controls.roles.setValue(roles))
      : (this.rolesAdded = false);
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
}

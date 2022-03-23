import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { UserFormPropModel } from 'src/app/core/domain/user.model';
import { User, UserStatus } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userDetailsForm: FormGroup;
  sourceAccounts: FromAccount[];
  private user: User;
  memberId: any;
  userFormprop: UserFormPropModel;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.memberId = activatedRoute.snapshot.paramMap.get("id");
    console.log('main', this.memberId);
    this.userFormprop = {
      addRoleLink: 'roles',
      userListLink: '/user-management',
      addProductLink: 'products',
      memberId: this.memberId
    }
  }

  ngOnInit(): void {

  }
}

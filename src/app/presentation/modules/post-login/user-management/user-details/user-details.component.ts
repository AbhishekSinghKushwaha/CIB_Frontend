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
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
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
  username: any;
  userFormprop: UserFormPropModel;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly authService: AuthService
  ) {
    this.username = activatedRoute.snapshot.paramMap.get("username");
    console.log('main', this.username);
    this.userFormprop = {
      addRoleLink: 'roles',
      userListLink: '/user-management',
      addProductLink: 'products',
      username: this.username
    }
    console.log('userData', authService.userState)
  }

  ngOnInit(): void {

  }
}

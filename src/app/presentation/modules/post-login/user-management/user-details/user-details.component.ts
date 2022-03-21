import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { UserFormPropModel } from 'src/app/core/domain/user.model';
import { LimitEditorService } from 'src/app/core/services/limit-editor/limit-editor.service';
import { ProductEditorService } from 'src/app/core/services/product-editor/product-editor.service';
import { RoleEditorService } from 'src/app/core/services/role-editor/role-editor.service';
import { SelectAccountAccessService } from 'src/app/core/services/select-account-access/select-account-access.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';
import { UserListService } from '../user-list/services/user-list.service';
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
      memberId: this.memberId
    }
  }

  ngOnInit(): void {

  }
}

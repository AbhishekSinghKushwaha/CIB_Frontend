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

  constructor(
    private readonly accountAccessService: SelectAccountAccessService,
    private readonly fb: FormBuilder,
    private readonly sharedDataService: SharedDataService,
    private readonly roleService: RoleEditorService,
    private readonly limitsService: LimitEditorService,
    private readonly productService: ProductEditorService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userListService: UserListService
  ) {}

  ngOnInit(): void {
    //ToDo: bind form to user model

    this.userDetailsForm = this.fb.group({
      roles: new FormControl(null),
      userName: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required]),
      limits: this.fb.group({
        userName: new FormControl(null, []),
        currency: new FormControl(null, []),
        transactionLimit: new FormControl(null, []),
        dailyLimit: new FormControl(null, []),
        weeklyLimit: new FormControl(null, []),
        monthlyLimit: new FormControl(null, []),
      }),
      accounts: new FormControl(null, []),
      productModules: new FormControl(null, []),
    });

    this.limitsService.save(this.userDetailsForm.get('limits') as FormGroup);

    this.sourceAccounts = [
      {
        accountNumber: 30982398,
        balance: 0,
        currency: 'EUR',
        transactionLimit: 100,
      },
      {
        accountNumber: 73271827,
        balance: 0,
        currency: 'EUR',
        transactionLimit: 100,
      },
    ];

    this.accountAccessService.selected.subscribe((rs) => {
      this.userDetailsForm.get('accounts')?.setValue(rs);
    });
    this.roleService.selected.subscribe((data) => {
      this.userDetailsForm.get('roles')?.setValue(data);
    });
    this.productService.selected.subscribe((data) => {
      this.userDetailsForm.get('products')?.setValue(data);
    });
    this.limitsService.currentUserDetails$.subscribe((data) => {
      this.userDetailsForm.get('limits')?.setValue(data);
    });

    this.activatedRoute.data.subscribe((data) => {
      this.user = data['user'];

      this.userDetailsForm.controls['userId'].setValue(this.user.id);
      this.userDetailsForm.controls['userName'].setValue(this.user.name);
      this.userDetailsForm.controls['phoneNumber'].setValue(this.user.phone);
    });
  }

  showAccounts(): void {
    this.accountAccessService.open(this.sourceAccounts);
  }

  save(): void {
    const save$ = this.user ? this.updateUser(this.user.id) : this.createUser();

    save$.subscribe(() => this.router.navigate(['/user-management/success']));
  }

  get hasRoles(): boolean | undefined {
    return this.userDetailsForm.get('roles')?.value.length > 0;
  }

  private createUser(): Observable<User> {
    const id: string = this.userDetailsForm.controls['userId'].value;
    const name: string = this.userDetailsForm.controls['userName'].value;
    const phone: string = this.userDetailsForm.controls['phoneNumber'].value;
    const status: UserStatus = 'pending';

    const user: User = { id, name, phone, status };

    return this.userListService.addUser(user);
  }

  private updateUser(userId: string): Observable<User | undefined> {
    const id: string = this.userDetailsForm.controls['userId'].value;
    const name: string = this.userDetailsForm.controls['userName'].value;
    const phone: string = this.userDetailsForm.controls['phoneNumber'].value;
    const status: UserStatus = 'pending';

    const user: User = { id, name, phone, status };

    return this.userListService.updateUser(userId, user);
  }
}

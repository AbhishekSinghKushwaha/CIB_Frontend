import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FromAccount } from 'src/app/core/domain/transfer.models';
import { LimitEditorService } from 'src/app/core/services/limit-editor/limit-editor.service';
import { ProductEditorService } from 'src/app/core/services/product-editor/product-editor.service';
import { RoleEditorService } from 'src/app/core/services/role-editor/role-editor.service';
import { SelectAccountAccessService } from 'src/app/core/services/select-account-access/select-account-access.service';
import { SharedDataService } from 'src/app/core/services/shared-data/shared-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userDetailsForm: FormGroup;
  sourceAccounts: FromAccount[];

  constructor(private readonly accountAccessService: SelectAccountAccessService, 
    private readonly fb: FormBuilder,
    private readonly sharedDataService: SharedDataService,
    private readonly roleService: RoleEditorService,
    private readonly limitsService: LimitEditorService,
    private readonly productService: ProductEditorService,
    private readonly router: Router) {

    }

  ngOnInit(): void {  

    //ToDo: bind form to user model 

    this.userDetailsForm =this.fb.group({
      roles: new FormControl(null),
      userName: new FormControl(null, [Validators.required]),
      userId: new FormControl(null, [Validators.required,]),
      phoneNumber: new FormControl(null, [Validators.required,]),
      limits:  this.fb.group({
        userName: new FormControl(null, [Validators.required]),
        currency: new FormControl(null, [Validators.required,]),
        transactionLimit: new FormControl(null, [Validators.required,]),
        dailyLimit: new FormControl(null, [Validators.required,]),
        weeklyLimit: new FormControl(null, [Validators.required,]),
        monthlyLimit: new FormControl(null, [Validators.required,]),
      }),
      accounts: new FormControl(null, [Validators.required,]),
      productModules: new FormControl(null, [/*Validators.required,*/]),
    });
    
    this.limitsService.save(this.userDetailsForm.get('limits') as FormGroup);

    this.sharedDataService.userAccounts.subscribe((res) => {
      this.sourceAccounts = res;
    });
    this.accountAccessService.selected.subscribe((rs) => {
      this.userDetailsForm.get("accounts")?.setValue(rs);
    });
    this.roleService.selected.subscribe( (data) => {
      this.userDetailsForm.get("roles")?.setValue(data);
    });
    this.productService.selected.subscribe( (data) => {
      this.userDetailsForm.get("products")?.setValue(data);
    });
    this.limitsService.currentUserDetails$.subscribe( (data) => {
      this.userDetailsForm.get("limits")?.setValue(data);
    })
  }

  showAccounts(): void {
    this.accountAccessService.open(this.sourceAccounts)
  }

  save(): void {    
    this.router.navigate(['/user-management/success']);
  }

  get hasRoles(): boolean | undefined {
    return this.userDetailsForm.get("roles")?.value.length > 0;
  }


}

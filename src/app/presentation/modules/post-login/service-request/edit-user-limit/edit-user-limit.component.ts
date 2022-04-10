import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { ConfirmationModalService } from 'src/app/core/services/modal-services/confirmation-modal.service';
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';
import { TeamMembersService } from 'src/app/core/services/customer-onboarding/team-members.service';
import { map, startWith, take, takeUntil } from 'rxjs/operators';
import { CurrencyModel } from 'src/app/core/domain/transfer.models';
import { UserService } from 'src/app/core/services/user/user.service';
import { UserLimitModel, UserListModel } from 'src/app/core/domain/user.model';
import { UserAdministrationService } from '../../user-management/services/user-administration.service';

@Component({
  selector: 'app-edit-user-limit',
  templateUrl: './edit-user-limit.component.html',
  styleUrls: ['./edit-user-limit.component.scss']
})
export class EditUserLimitComponent implements OnInit {
  editUserDataForm: FormGroup;
  data: ConfirmationModel;
  completionData = CONFIRMATIONCOMPLETION.editUserLimit;
  completed: boolean;
  username: any;
  userDetail: any;
  selectedCurrency: CurrencyModel;
  userLimits: UserLimitModel[];
  updateMode: boolean;
  userListData: UserListModel[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationModalService: ConfirmationModalService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly location: Location,
    private readonly teamMembersService: TeamMembersService,
    private readonly userService: UserService,
    private readonly userAdministrationService: UserAdministrationService) {

    this.username = activatedRoute.snapshot.paramMap.get('username');
  }

  ngOnInit(): void {
    this.initForm();
    this.checkCurrencyValueChanges();
    this.checkNameValueChanges();
    if (this.username) {
      this.getUserLimits(this.username);
      this.getUser(this.username);
    } else {
      this.getAllUsers()
    }
  }

  getAllUsers() {
    this.userAdministrationService.getUsers().subscribe((result: any) => {
      this.userListData = result.items.map((element: UserListModel) => {
        // TODO: lastViewed column to be set from backend
        return {
          idNumber: element.idNumber,
          name: `${element.firstName} ${element.lastName}`,
          profileType: 'Individual',
          userName: element.userName,
          status: element.statusName.match(/[A-Z][a-z]+|[0-9]+/g)?.join(" "),
          lastViewed: ''
        };
      });
    });
  }

  getUserLimits(username: string) {
    this.userService
      .getLimit(username)
      .subscribe((response: any) => {
        console.log('getUserLimits', response);
        if (response.isSuccessful) {
          this.userLimits = response.data;
        }
      });
  }

  getUser(username: string) {
    this.teamMembersService
      .getTeamMemberDetails(username)
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.userDetail = res.data;
        }
      });
  }


  goBack() {
    this.location.back();
  }

  submit() {
    this.data = {
      title: 'Confirmation',
      subtitle: 'Confirm the following details',
      submitButtonText: 'Submit',
      content: [{
        key: 'User',
        value: this.editUserDataForm.value.user.name
      }, {
        key: 'Currency',
        value: this.editUserDataForm.value.currency.currencyCode
      }, {
        key: 'Transaction limit',
        value: this.editUserDataForm.value.transactionLimit
      }, {
        key: 'Daily Limit',
        value: this.editUserDataForm.value.dailyLimit
      }
        , {
        key: 'Weekly Limit',
        value: this.editUserDataForm.value.weeklyLimit
      }, {
        key: 'Monthly Limit',
        value: this.editUserDataForm.value.monthlyLimit
      }]
    }
    this.confirmationModalService.open(this.data).afterClosed().subscribe((data: boolean) => {
      this.completed = !!data;
      const { user, currency, ...payload } = this.editUserDataForm.getRawValue();
      console.log({ ...payload, currencyCode: this.editUserDataForm.value.currency.currencyCode });
      if (!this.updateMode) {
        this.userService
          .addLimit(this.username, { ...payload, currencyCode: this.editUserDataForm.value.currency.currencyCode })
          .subscribe((response: any) => {
            console.log(response)
            if (response.isSuccessful) {

            }
          })
      } else {
        this.userService
          .editLimit(this.username, this.editUserDataForm.value.currency.currencyCode, payload)
          .subscribe((response: any) => {
            console.log(response)
            if (response.isSuccessful) {

            }
          })
      }
    })
  }

  confirmationDone(event: boolean) {
    if (event) {
      this.editUserDataForm.reset();
      this.completed = false;
      this.goBack();
    }
  }

  initForm(): void {
    this.editUserDataForm = new FormGroup({
      user: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      transactionLimit: new FormControl('', [Validators.required]),
      dailyLimit: new FormControl('', [Validators.required]),
      weeklyLimit: new FormControl('', [Validators.required]),
      monthlyLimit: new FormControl('', [Validators.required]),
    });
  }

  checkValueChanges() {
    // this.editUserDataForm.valueChanges
    //   .pipe()
    //   .subscribe()
  }

  checkCurrencyValueChanges() {
    this.editUserDataForm.controls.currency
      .valueChanges
      .pipe(startWith(null))
      .subscribe((data) => {
        if (data && this.selectedCurrency !== data) {
          this.selectedCurrency = data;
          this.updateMode = false;
          const currentLimit = this.userLimits?.length && this.userLimits.find(x => x.currencyCode === this.selectedCurrency.currencyCode);
          if (currentLimit) {
            this.editUserDataForm.controls.transactionLimit.setValue(currentLimit?.transactionLimit);
            this.editUserDataForm.controls.dailyLimit.setValue(currentLimit?.dailyLimit);
            this.editUserDataForm.controls.weeklyLimit.setValue(currentLimit?.weeklyLimit);
            this.editUserDataForm.controls.monthlyLimit.setValue(currentLimit?.monthlyLimit);
            this.updateMode = true;
          } else {
            this.editUserDataForm.controls.transactionLimit.setValue('');
            this.editUserDataForm.controls.dailyLimit.setValue('');
            this.editUserDataForm.controls.weeklyLimit.setValue('');
            this.editUserDataForm.controls.monthlyLimit.setValue('');
          }
        }
      });
  }

  checkNameValueChanges() {
    this.editUserDataForm.controls.user
      .valueChanges.pipe(
        startWith(null),
      ).subscribe((res) => {
        if (res) {
          console.log('Changes', res);
          this.username = res.userName
          this.userDetail = res;
          this.getUserLimits(res.userName)
        }
      });
  }

}

import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { concatMap, map, tap, mergeMap, startWith } from 'rxjs/operators';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { CorporateLimitModel, CorporateModel } from 'src/app/core/domain/corporate.model';
import { CurrencyModel } from 'src/app/core/domain/transfer.models';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CorporateService } from 'src/app/core/services/corporate/corporate.service';
import { ConfirmationModalService } from 'src/app/core/services/modal-services/confirmation-modal.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';

@Component({
  selector: 'app-edit-company-limit',
  templateUrl: './edit-company-limit.component.html',
  styleUrls: ['./edit-company-limit.component.scss']
})
export class EditCompanyLimitComponent implements OnInit {
  editCompanyDataForm: FormGroup;
  data: ConfirmationModel;
  completionData = CONFIRMATIONCOMPLETION.editCompanyLimit;
  completed: boolean;
  corporate: CorporateModel;
  corporateLimit: CorporateLimitModel[];
  selectedCurrency: CurrencyModel;
  updateMode: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly corporateService: CorporateService,
    private readonly location: Location,
    private readonly authService: AuthService,
    private readonly confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    this.initForm();
    this.getCorporate();
  }

  getCorporate() {
    // TODO : Corporate information should be gotten from core service and not onboarding
    this.userService
      .getUserCorporateDetail(this.authService.userState.corporateId)
      .pipe(
        map((res: any) => res.data),
        concatMap((res: CorporateModel) => this.corporateService.getCorporateDetail(res.emailAddress)),
        map((res: any) => res.data),
        tap(res => this.corporate = res),
        concatMap((res: CorporateModel) => this.corporateService.getLimit(res.id)),
      )
      .subscribe((response: any) => {
        if (response) {

          this.corporateLimit = response.data;
          this.checkCurrencyValueChanges();
        }
      });
  }

  checkCurrencyValueChanges() {
    this.editCompanyDataForm.controls.currency
      .valueChanges
      .pipe(startWith(null))
      .subscribe((data) => {
        if (data && this.selectedCurrency !== data) {
          this.updateMode = false;
          this.selectedCurrency = data;
          const currentLimit = this.corporateLimit?.length && this.corporateLimit.find(x => x.currencyCode === this.selectedCurrency.currencyCode);
          if (currentLimit) {
            this.editCompanyDataForm.controls.transactionLimit.setValue(currentLimit?.transactionLimit);
            this.editCompanyDataForm.controls.dailyLimit.setValue(currentLimit?.dailyLimit);
            this.editCompanyDataForm.controls.weeklyLimit.setValue(currentLimit?.weeklyLimit);
            this.editCompanyDataForm.controls.monthlyLimit.setValue(currentLimit?.monthlyLimit);
            this.updateMode = true;
          } else {
            this.editCompanyDataForm.controls.transactionLimit.setValue('');
            this.editCompanyDataForm.controls.dailyLimit.setValue('');
            this.editCompanyDataForm.controls.weeklyLimit.setValue('');
            this.editCompanyDataForm.controls.monthlyLimit.setValue('');
          }
        }
      });
  }

  submit() {
    this.data = {
      title: 'Confirmation',
      subtitle: 'Confirm the following details',
      submitButtonText: 'Submit',
      content: [{
        key: 'Company',
        value: this.editCompanyDataForm.value.company
      }, {
        key: 'Currency',
        value: this.editCompanyDataForm.value.currency.currencyCode
      }, {
        key: 'Transaction limit',
        value: this.editCompanyDataForm.value.transactionLimit
      }, {
        key: 'Daily Limit',
        value: this.editCompanyDataForm.value.dailyLimit
      }
        , {
        key: 'Weekly Limit',
        value: this.editCompanyDataForm.value.weeklyLimit
      }, {
        key: 'Monthly Limit',
        value: this.editCompanyDataForm.value.monthlyLimit
      }]
    }
    this.confirmationModalService
      .open(this.data)
      .afterClosed()
      .subscribe((data: boolean) => {
        const { company, currency, ...payload } = this.editCompanyDataForm.getRawValue();
        if (!this.updateMode) {
          this.corporateService
            .addLimit(this.corporate.id, { ...payload, currencyCode: this.editCompanyDataForm.value.currency.currencyCode })
            .subscribe((response: any) => {
              if (response.isSuccessful) {
                this.completed = !!data;
              }
            })
        } else {
          this.corporateService
            .editLimit(this.corporate.id, this.editCompanyDataForm.value.currency.currencyCode, payload)
            .subscribe((response: any) => {

              if (response.isSuccessful) {
                this.completed = !!data;
              }
            })
        }
      })
  }

  confirmationDone(event: boolean) {
    if (event) {
      this.editCompanyDataForm.reset();
      this.completed = false;
      this.goBack();
    }
  }

  goBack() {
    this.location.back();
  }

  initForm(): void {
    this.editCompanyDataForm = this.fb.group({
      company: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      transactionLimit: ['', [Validators.required]],
      dailyLimit: ['', [Validators.required]],
      weeklyLimit: ['', [Validators.required]],
      monthlyLimit: ['', [Validators.required]],
    });
  }

}

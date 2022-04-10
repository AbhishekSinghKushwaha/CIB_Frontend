import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
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

  constructor(
    private readonly fb: FormBuilder,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    this.initForm();
    this.getCorporate();
  }

  getCorporate() {
    console.log('CorporateId', this.authService.userState.corporateId)
    this.userService
      .getUserCorporateDetail(this.authService.userState.corporateId)
      .subscribe((response: any) => {
        if (response.isSuccessful) {
          console.log('getUserCorporateDetail', response);
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
        value: this.editCompanyDataForm.value.company.name
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
    this.confirmationModalService.open(this.data).afterClosed().subscribe((data: boolean) => {
      this.completed = !!data;
    })
  }

  confirmationDone(event: boolean) {
    if (event) {
      this.editCompanyDataForm.reset();
      this.completed = false;
    }
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

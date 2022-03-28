import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { ConfirmationModalService } from 'src/app/core/services/modal-services/confirmation-modal.service';
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';

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

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    this.initForm();
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
    })
  }

  confirmationDone(event: boolean) {
    if (event) {
      this.editUserDataForm.reset();
      this.completed = false;
    }
  }

  initForm(): void {
    this.editUserDataForm = this.fb.group({
      user: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      transactionLimit: ['', [Validators.required]],
      dailyLimit: ['', [Validators.required]],
      weeklyLimit: ['', [Validators.required]],
      monthlyLimit: ['', [Validators.required]],
    });
  }

}

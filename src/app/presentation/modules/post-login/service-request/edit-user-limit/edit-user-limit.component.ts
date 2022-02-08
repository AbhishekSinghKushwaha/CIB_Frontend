import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';

@Component({
  selector: 'app-edit-user-limit',
  templateUrl: './edit-user-limit.component.html',
  styleUrls: ['./edit-user-limit.component.scss']
})
export class EditUserLimitComponent implements OnInit {
  editUserDataForm: FormGroup;
  data: ConfirmationModel;
  completionData = CONFIRMATIONCOMPLETION.chequeBook;
  completed: boolean;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  submit() {

  }

  confirmationDone(event: boolean) {
    event && (this.completed = false) && this.editUserDataForm.reset();
  }

  initForm(): void {
    this.editUserDataForm = this.fb.group({
      user: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      transactionLimit: ['', [Validators.required]],
      dailyLimit: ['', [Validators.required]],
      weeklyLimit: ['', [Validators.required]],
      wmonthlyLimit: ['', [Validators.required]],
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { ConfirmationModalService } from 'src/app/core/services/modal-services/confirmation-modal.service';
import { CONFIRMATIONCOMPLETION } from 'src/app/core/utils/constants/confirmation.constants';

@Component({
  selector: 'app-static-data-update',
  templateUrl: './static-data-update.component.html',
  styleUrls: ['./static-data-update.component.scss']
})
export class StaticDataUpdateComponent implements OnInit {
  dataUpdateForm: FormGroup;
  data: ConfirmationModel;
  completionData = CONFIRMATIONCOMPLETION.staticUserData;
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
        value: this.dataUpdateForm.value.user.name
      }, {
        key: 'Currency',
        value: this.dataUpdateForm.value.phoneNumber
      }, {
        key: 'Transaction limit',
        value: this.dataUpdateForm.value.email
      }]
    }
    this.confirmationModalService.open(this.data).afterClosed().subscribe((data: boolean) => {
      this.completed = !!data;
    })
  }

  confirmationDone(event: boolean) {
    if (event) {
      this.dataUpdateForm.reset();
      this.completed = false;
    }
  }

  initForm(): void {
    this.dataUpdateForm = this.fb.group({
      user: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

}

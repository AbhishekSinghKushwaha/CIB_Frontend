import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationModel } from 'src/app/core/domain/confirmation.model';
import { ConfirmationModalService } from './../../../../../core/services/modal-services/confirmation-modal.service';

@Component({
  selector: 'app-chequebook-request',
  templateUrl: './chequebook-request.component.html',
  styleUrls: ['./chequebook-request.component.scss']
})
export class ChequebookRequestComponent implements OnInit {
  chequebookRequestForm: FormGroup;
  data: ConfirmationModel;

  constructor(
    private readonly fb: FormBuilder,
    private readonly confirmationModalService: ConfirmationModalService) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): void {
    this.chequebookRequestForm = this.fb.group({
      chequeBookAccount: ['', [Validators.required]],
      chequeBookQuantity: ['', [Validators.required]],
      chequeBookLeaves: ['', [Validators.required]],
      branch: ['', [Validators.required]],
    });
  }

  submit(): void {
    this.data = {
      title: 'Confirmation',
      subtitle: 'Confirm the following',
      submitButtonText: 'Submit',
      content: [{
        key: 'Cheque Account',
        value: 'Loot<br>081017823638'
      }, {
        key: 'Number of cheque book',
        value: '3'
      }, {
        key: 'Number of leaves',
        value: '75'
      }, {
        key: 'Branch',
        value: 'Branch address'
      }
        , {
        key: 'Cheque book cost deducted from cheque account',
        value: 'Total cost'
      }, {
        key: 'Amount',
        value: '5,000.00 KES'
      }]
    }
    this.confirmationModalService.open(this.data)
  }
}

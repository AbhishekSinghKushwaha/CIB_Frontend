import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bulk-transfer-view',
  templateUrl: './bulk-transfer-view.component.html',
  styleUrls: ['./bulk-transfer-view.component.scss']
})
export class BulkTransferViewComponent implements OnInit {

  bulkTransferViewForm: FormGroup;
  editMode: boolean = false;
  alertVisible: boolean;
  alertMessage: string;

  transactionIcon = { Active: 'transaction_approved', Inactive: 'transaction_pending' };

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  get getForm() {
    return this.bulkTransferViewForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  initForm(): void {
    this.bulkTransferViewForm = this.fb.group({
      paymentDate: ['', [Validators.required]],
      paymentType: ['', [Validators.required]],
      debitAccountName: ['', [Validators.required]],
      debitAccountNumber: ['',[Validators.required, Validators.pattern("[0-9 ]{13}")]],
      beneficiaryAccountNumber: ['', [Validators.required, Validators.pattern("[0-9 ]{13}")]],
      beneficiaryMobile: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
      beneficiaryName: ['', [Validators.required]],
      beneficiaryBank: ['', [Validators.required]],
      amount: ['', [Validators.required]],
      currency: ['', [Validators.required]],
      reference: ['', [Validators.required]],
      reason: [''],
    });
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  edit() {
    this.editMode = true;
  }

  delete() {
    console.log('delete');
  }

  save(){
    this.editMode = false;
    this.showAlert("The payment details have been updated");
  }

  populateForm() {
    this.bulkTransferViewForm.controls.debitAccountNumber.setValue('22378465789');
    this.bulkTransferViewForm.controls.beneficiaryAccountNumber.setValue('22378465789');
    this.bulkTransferViewForm.controls.amount.setValue('200');
    this.bulkTransferViewForm.controls.beneficiaryMobile.setValue('852963147');
  }

}

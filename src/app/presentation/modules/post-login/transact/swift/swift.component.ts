import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';

@Component({
  selector: 'app-swift',
  templateUrl: './swift.component.html',
  styleUrls: ['./swift.component.scss'],
})
export class SwiftComponent implements OnInit {
  swiftTransferForm: FormGroup;

  transferType = TransactionTypeConstants.TransferType;

  get getForm() {
    return this.swiftTransferForm.controls;
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.swiftTransferForm = this.fb.group({
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      fxReferenceId: ['', [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      schedulePayment: ['', [Validators.required]],
      license: ['', [Validators.required]],
      charges: ['', [Validators.required]],
      paymentCategory: ['', [Validators.required]],
      reason: [''],
    });
  }

  getTransferCharges() {}
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';

@Component({
  selector: 'app-swift',
  templateUrl: './swift.component.html',
  styleUrls: ['./swift.component.scss'],
})
export class SwiftComponent implements OnInit {
  swiftTransferForm: FormGroup;

  get getForm() {
    return this.swiftTransferForm.controls;
  }

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.swiftTransferForm = this.fb.group({
      transactionType: ['', [Validators.required]],
      sendFrom: ['', [Validators.required]],
      sendTo: ['', [Validators.required]],
      fxReferenceId: ['', [Validators.required]],
      amount: [{}, [Validators.required, accountLimitValidator]],
      schedulePayment: ['', [Validators.required]],
      license: ['', [Validators.required]],
      charges: ['', [Validators.required]],
      paymentCategory: [''],
      reason: [''],
    });
  }

  getTransferCharges() {}
}

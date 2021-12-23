import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { accountLimitValidator } from 'src/app/core/utils/validators/limits.validators';

@Component({
  selector: 'app-mobile-money',
  templateUrl: './mobile-money.component.html',
  styleUrls: ['./mobile-money.component.scss'],
})
export class MobileMoneyComponent implements OnInit {
  mobileMoneyTransferForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.mobileMoneyTransferForm = this.fb.group({
      transactionType: ['', [Validators.required]],
      sendFrom: ['', [Validators.required]],
      sendTo: ['', Validators.required],
      amount: [{}, [Validators.required, accountLimitValidator]],
      fxReferenceId: ['', [Validators.required]],
      schedulePayment: ['', [Validators.required]],
      reason: [''],
    });
  }

  getTransferCharges() {}
}

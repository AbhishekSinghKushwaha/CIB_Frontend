import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-other-banks',
  templateUrl: './other-banks.component.html',
  styleUrls: ['./other-banks.component.scss'],
})
export class OtherBanksComponent implements OnInit {
  loading: boolean = false;
  interBankTransferForm: FormGroup;
  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.interBankTransferForm = this.fb.group({
      transactionType: ['', [Validators.required]],
      sendFrom: ['', [Validators.required]],
      sendTo: ['', Validators.required],
      amount: [{}, [Validators.required]],
      fxReferenceId: ['', [Validators.required]],
      reason: [''],
    });
  }

  // Get transfer charge, then proceed to review payment
  getTransferCharges() {}
}

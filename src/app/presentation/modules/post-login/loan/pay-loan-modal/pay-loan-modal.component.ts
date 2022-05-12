import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pay-loan-modal',
  templateUrl: './pay-loan-modal.component.html',
  styleUrls: ['./pay-loan-modal.component.scss'],
})
export class PayLoanModalComponent implements OnInit {
  selection: 'full' | 'partial' = 'full';
  payLoanForm: FormGroup = new FormGroup({
    amount: new FormControl('', []),
  });

  constructor(
    private readonly dialogRef: MatDialogRef<PayLoanModalComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: any
  ) {}

  ngOnInit(): void {
    const control: FormControl = this.payLoanForm.get('amount') as FormControl;

    control.setValue(this.data.amount);
  }

  close(): void {
    this.dialogRef.close();
  }

  updateForm(selection: 'full' | 'partial'): void {
    this.selection = selection;
    const control: FormControl = this.payLoanForm.get('amount') as FormControl;

    if (this.selection === 'full') {
      control.setValue(this.data.amount);
      control.clearValidators();
    } else {
      control.setValue('');
      control.setValidators([Validators.required]);
    }

    control.updateValueAndValidity();
  }

  pay(): void {
    const amount: string = this.payLoanForm.get('amount')?.value;

    this.dialogRef.close(amount);
  }
}

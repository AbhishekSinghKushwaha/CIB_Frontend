import { Subject } from 'rxjs';
import { Component, OnInit, QueryList, ViewChildren, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss']
})
export class SmsVerificationComponent implements OnInit {
  @ViewChildren('inputs') inputs: QueryList<any>;
  verifyOtpForm: FormGroup;
  timeToResend: number;
  otpResent = false;
  submitted = false;
  numOfDigits = 6;
  formSubmission = new Subject<boolean>();
  @Output() onOTPVerified = new Subject<boolean>();

  constructor(private readonly fb: FormBuilder) {
    this.initOtpForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f(): any {
    return this.verifyOtpForm.controls;
  }

  get verifyOtpFormArray() {
    return this.verifyOtpForm.get('digits') as FormArray;
  }

  initOtpForm(): void {
    this.verifyOtpForm = this.fb.group({
      digits: this.fb.array([]),
    });
  }

  initForm(): void {
    for (let i = 0; i < this.numOfDigits; i++) {
      (this.verifyOtpForm.get('digits') as FormArray).push(
        this.fb.control(null, Validators.required)
      );
    }
  }

  check(index: number, field: any, event: any): void {
    if (isNaN(parseInt(event.key, 10)) && event.key !== 'Backspace') {
      event.preventDefault();
    }
    if (field.value && event.key !== 'Backspace') {
      if (index < this.inputs.toArray().length - 1) {
        this.inputs.toArray()[index + 1].nativeElement.focus();
      }
    } else if (event.key === 'Backspace') {
      if (index > 0) {
        field.setValue(null);
        this.inputs.toArray()[index - 1].nativeElement.focus();
      } else {
        // console.log('first field');
      }
    }
  }

  submit() {
    this.formSubmission.next(true)
  }

  verifyOTP() {
    this.onOTPVerified.next(true);
  }

}

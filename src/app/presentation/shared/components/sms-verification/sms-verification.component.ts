import { Subject } from 'rxjs';
import {
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  Output,
  Input,
} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { SharedUtils } from './../../../../core/utils/shared.util';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { LoginSmsVerificationService } from 'src/app/core/services/login-sms-verification/login-sms-verification.service';

@Component({
  selector: 'app-sms-verification',
  templateUrl: './sms-verification.component.html',
  styleUrls: ['./sms-verification.component.scss'],
})
export class SmsVerificationComponent implements OnInit {
  @ViewChildren('inputs') inputs: QueryList<any>;
  verifyOtpForm: FormGroup;
  timeToResend: number;
  otpResent = false;
  submitted = false;
  numOfDigits = 6;
  formSubmission = new Subject<boolean>();
  @Output() onOTPVerified = new Subject<string>();
  _otpError: boolean;
  @Input() set otpError(data: boolean) {
    if (data) {
      this.modalIncorectVerification();
    }
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly notificationModalService: NotificationModalService,
    private readonly storageService: StorageService,
    private readonly loginSmsVerificationService: LoginSmsVerificationService
  ) {
    this.initOtpForm();
  }

  ngOnInit(): void {
    this.initForm();
    this.initOTPTimer();
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

  initOTPTimer(seconds: number = 60): void {
    this.timeToResend = seconds;
    const intervalId = setInterval(() => {
      this.timeToResend = this.timeToResend - 1;
      if (this.timeToResend === 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  }
  restartOTPTimer(): void {
    const intervalId = setInterval(() => {
      this.otpResent = false;
      this.initOTPTimer();
      clearInterval(intervalId);
    }, 5000);
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
    this.formSubmission.next(true);
  }

  verifyOTP() {
    if (this.verifyOtpFormArray.valid) {
      this.onOTPVerified.next(this.verifyOtpFormArray.getRawValue().join(''));
    }
  }

  modalIncorectVerification(): void {
    const message = SharedUtils.getNotificationModalParam({
      title: 'Incorrect verification code',
      message:
        "The details you entered aren't familiar to us. Please try again or register to create your profile",
      buttonText: 'Try again',
    });
    this.notificationModalService.open(message);
  }

  public async resendOTPCode(): Promise<void> {
    const user = await this.storageService.getData('loginCred');
    this.verifyOtpFormArray.reset();

    this.loginSmsVerificationService.resendOTP(user).subscribe(
      (data) => {
        this.otpResent = true;
        this.restartOTPTimer();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

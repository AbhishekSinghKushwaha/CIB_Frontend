import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/domain/user.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import LOGIN_CONSTANTS from 'src/app/core/utils/constants/pre-login.constants';

@Component({
  selector: 'app-login-sms-verification',
  templateUrl: './login-sms-verification.component.html',
  styleUrls: ['./login-sms-verification.component.scss'],
})
export class LoginSmsVerificationComponent implements OnInit {
  @ViewChildren('inputs') inputs: QueryList<any>;
  verifyOtpForm: FormGroup = new FormGroup({});
  timeToResend: number;
  otpResent = false;
  submitted = false;
  numOfDigits = 6;
  user: UserModel;
  otpError: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.initOtpForm();
  }

  async ngOnInit(): Promise<void> {
    this.initForm();
    // this.checkLoginStatus();
  }

  private async checkLoginStatus(): Promise<void> {
    this.authService
      .getUserData()
      .then((data: UserModel) => {
        if (!data) {
          this.router.navigate(['/auth/login']);
        }
        this.user = data;
      })
      .catch((e) => console.log(e));
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

  submit(otp: string) {
    this.otpError = false;
    if (otp) {
      this.authService.submitOTP(otp).subscribe(
        async (response) => {
          console.log('submitOTP', response);
          if (response) {
            const loginStat = await this.authService.loginSuccess();
            if (!loginStat) {
              this.otpError = true;
            }
          } else {
            this.otpError = true;
          }
        },
        (error) => {
          this.otpError = true;
          console.log({ error });
        }
      );
    }
  }

  cancelLogin() {
    this.authService.cancelLogin();
  }
}

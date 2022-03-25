import {
  Component,
  OnInit,
  Input,
  Inject,
  ViewChildren,
  ElementRef,
  Output,
  QueryList,
} from '@angular/core';
import { otpCodeModel } from 'src/app/core/domain/otp-code.model';
import { OtpCodeService } from 'src/app/core/services/otp-code/otp-code.service';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedUtils } from './../../../../core/utils/shared.util';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import { BuyAirtimeService } from 'src/app/core/services/transfers/buy-airtime/buy-airtime.service';


@Component({
  selector: 'app-verify-by-code',
  templateUrl: './verify-by-code.component.html',
  styleUrls: ['./verify-by-code.component.scss'],
})
export class VerifyByCodeComponent implements OnInit {
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

  timeLeft: number = 60;
  interval: any;
  alertVisible: boolean;
  alertMessage: string;
  @Input() data: any;
  payload: any;
  airtimePayload: any;

  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;
  
  @Input() transactionType!: string;
  transferType = TransactionTypeConstants.TransferType;

  constructor(
    private readonly otpCodeService: OtpCodeService,
      private readonly buyGoodsService: BuyGoodsService,
      private readonly router: Router,
      private readonly fb: FormBuilder,
      private readonly notificationModalService: NotificationModalService,
      private readonly authService: AuthService,
      private readonly buyAirtimeService: BuyAirtimeService
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

    modalIncorectVerification(): void {
      const message = SharedUtils.getNotificationModalParam({
        title: 'Incorrect verification code',
        message:
          "The details you entered aren't familiar to us. Please try again or register to create your profile",
        buttonText: 'Try again',
      });
      this.notificationModalService.open(message);
    }

    initForm(): void {
      for (let i = 0; i < this.numOfDigits; i++) {
        (this.verifyOtpForm.get('digits') as FormArray).push(
          this.fb.control(null, Validators.required)
        );
      }
    }

  submit(): void {
    this.otpCodeService.set(this.verifyOtpForm.value);
  }

  showAlert(message: string): void {
    if (this.alertVisible) {
      return;
    }
    this.alertVisible = true;
    this.alertMessage = message;
    setTimeout(() => (this.alertVisible = false), 2500);
  }

  public async resendOTPCode(): Promise<void> {
    this.verifyOtpFormArray.reset();
    this.showAlert("We’ve sent you another code");
    this.authService.resendOTP().subscribe(
      (data) => {
        this.otpResent = true;
        this.restartOTPTimer();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  verify() {
    if (this.verifyOtpFormArray.valid) {
      this.onOTPVerified.next(this.verifyOtpFormArray.getRawValue().join(''));
    }
    this.submitOtp(this.verifyOtpFormArray.getRawValue().join(''));
  }

  submitOtp(otp: string) {
    this.otpError = false;
    if (otp) {
      this.authService.submitOTP(otp).subscribe(
        (response) => {
          if (response) {
            if(this.transactionType === this.transferType.BUY_AIRTIME) {
              this.buyAirtime();
            }
            else if(this.transactionType === this.transferType.BUY_GOODS) {
              this.buyGoods();
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

  buyAirtime() {
    this.buyAirtimeService.currentData.subscribe(data => {
      this.airtimePayload = data;
    });
    if(this.airtimePayload) {
      this.buyAirtimeService.buyAirtimeTransfer(this.airtimePayload).subscribe(
        (res) => {
          if(res.status){
          this.router.navigate(['/transact/buy-airtime/success']);
        } else{
          console.log(res.message);
        }
      },
      (err) => {
        alert(
          `Sorry, we're unable to complete your transaction. Please give us some time to fix the problem and try again later.`
        );
      }
      );
    }
  }

  buyGoods() {
    this.buyGoodsService.currentData.subscribe(data => {
      this.payload = data;
    });
    if(this.payload) {
      this.buyGoodsService.buyGoodsTransfer(this.payload).subscribe(
        (res) => {
          if (res.status) {
            this.router.navigate(["/transact/buy-goods/submit-transfer"]);
          } else {
            console.log(res.message);
            // TODO:: Notify Error
          }
        },
        (err) => {
          alert(
            `Sorry, we're unable to complete your transaction. Please give us some time to fix the problem and try again later.`
          );
        }
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
}

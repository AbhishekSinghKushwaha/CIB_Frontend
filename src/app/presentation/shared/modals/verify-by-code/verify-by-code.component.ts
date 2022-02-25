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
import { GenerateOtpService } from 'src/app/core/services/generate-otp/generate-otp.service';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SharedUtils } from './../../../../core/utils/shared.util';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';


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

  formInput = ['input1', 'input2', 'input3', 'input4', 'input5', 'input6'];
  @ViewChildren('formRow') rows: any;

  constructor(
    private readonly otpCodeService: OtpCodeService,
      private readonly generateOtpService: GenerateOtpService,
      private readonly buyGoodsService: BuyGoodsService,
      private readonly router: Router,
      private readonly fb: FormBuilder,
      private readonly notificationModalService: NotificationModalService,
    ) {
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

  resendOtp() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
        this.pauseTimer();
      }
    },1000)
    this.showAlert("We’ve sent you another code");
    this.buyGoodsService.currentData.subscribe(data => {
      this.payload = data;
      if(data) {
        this.generateOtpService.regenerateOtp(this.payload).subscribe((res) => {
          if(res.status){
            console.log(res.data, "otp");
          }
        });
      }
    });
    this.verifyOtpFormArray.reset();
  }

  verify() {
    if (this.verifyOtpFormArray.valid) {
      this.onOTPVerified.next(this.verifyOtpFormArray.getRawValue().join(''));
      this.buyGoodsService.currentData.subscribe(data => {
        this.payload = data;
        if(data) {
          this.buyGoodsService.payBuyGoods(this.payload).subscribe((res) => {
            if(res.status){
              this.router.navigate(["/transact/buy-goods/submit-transfer"]);
            }
          });
        }
      });
    }
  }

  pauseTimer() {
    clearInterval(this.interval);
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

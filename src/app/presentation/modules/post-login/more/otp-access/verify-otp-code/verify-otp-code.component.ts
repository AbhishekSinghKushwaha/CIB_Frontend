import { Component, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CorporateService } from 'src/app/core/services/corporate/corporate.service';
import { NotificationModalService } from 'src/app/core/services/modal-services/notification-modal/notification-modal.service';
import { OtpCodeService } from 'src/app/core/services/otp-code/otp-code.service';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { TransactionsService } from 'src/app/core/services/transactions/transactions.service';
import { BillServiceService } from 'src/app/core/services/transfers/bill-service/bill-service.service';
import { BuyAirtimeService } from 'src/app/core/services/transfers/buy-airtime/buy-airtime.service';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';
import { InterbankService } from 'src/app/core/services/transfers/interbank/interbank.service';
import { IntercountryService } from 'src/app/core/services/transfers/intercountry/intercountry.service';
import { IntrabankService } from 'src/app/core/services/transfers/intrabank/intrabank.service';
import { MobileMoneyService } from 'src/app/core/services/transfers/mobile-money/mobile-money.service';
import { OwnAccountService } from 'src/app/core/services/transfers/own-account/own-account.service';
import { PesalinkService } from 'src/app/core/services/transfers/pesalink/pesalink.service';
import { SwiftTransferService } from 'src/app/core/services/transfers/swift/swift-transfer.service';
import { TransactionTypeConstants } from 'src/app/core/utils/constants/transaction-type.constants';
import SharedUtils from 'src/app/core/utils/shared.util';
import { Location } from '@angular/common';

@Component({
  selector: 'app-verify-otp-code',
  templateUrl: './verify-otp-code.component.html',
  styleUrls: ['./verify-otp-code.component.scss']
})
export class VerifyOtpCodeComponent implements OnInit {

  [x: string]: any;
  @ViewChildren("inputs") inputs: QueryList<any>;
  verifyOtpForm: FormGroup;
  timeToResend: number;
  otpResent = false;
  submitted = false;
  numOfDigits = 6;
  formSubmission = new Subject<boolean>();
  @Output() onOTPVerified = new Subject<string>();
  _otpError: boolean;
  selected: any;
  coporateUserId: any;
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
  billPaymentPayload: any;

  formInput = ["input1", "input2", "input3", "input4", "input5", "input6"];
  @ViewChildren("formRow") rows: any;

  @Input() transactionType!: string;
  transferType = TransactionTypeConstants.TransferType;
  transactionApprovalStatus =
    TransactionTypeConstants.TransactionApprovalStatus;

  constructor(
    private readonly otpCodeService: OtpCodeService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly notificationModalService: NotificationModalService,
    private readonly authService: AuthService,
    private readonly corporateService: CorporateService,
    private readonly otpVerificationListService: OtpVerificationListService,
    private storageService: StorageService,
    public route: ActivatedRoute


  ) {
    this.initOtpForm();
    this.otpVerificationType = route.snapshot.params["data"];

  }

  ngOnInit(): void {
    this.initForm();
    this.initOTPTimer();
    this.initCib();

  }
  get f(): any {
    return this.verifyOtpForm.controls;
  }

  get otpMessage() {
    return this.authService.getOTPMessage();
  }

  get verifyOtpFormArray() {
    return this.verifyOtpForm.get("digits") as FormArray;
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
      title: "Incorrect verification code",
      message:
        "The details you entered aren't familiar to us. Please try again or register to create your profile",
      buttonText: "Try again",
    });
    this.notificationModalService.open(message);
  }

  initForm(): void {
    for (let i = 0; i < this.numOfDigits; i++) {
      (this.verifyOtpForm.get("digits") as FormArray).push(
        this.fb.control(null, Validators.required)
      );
    }
  }

  submit(): void {
    this.otpCodeService.set(this.verifyOtpForm.value);
  }

  initCib(){
    const currentUser= this.storageService.getData('currentUserData');
    this.coporateUserId = currentUser.id;
  }

  cibVerify() {
    if (this.verifyOtpFormArray.valid) {
      this.onOTPVerified.next(this.verifyOtpFormArray.getRawValue().join(""));
    }
    const otp = this.verifyOtpFormArray.getRawValue().join("")
    const payload = {
      messageOption: this.otpVerificationType
    }

    this.cibVerifyOtp(payload, otp);
  }

  cibVerifyOtp(payload:any, otp: string) {
    this.corporateService.verifyOtp(otp).subscribe(
      (data) => {
        this.corporateService.updateNotificationSetting(this.coporateUserId, payload).subscribe(response => {
          this.router.navigate(["/more/otp-access/otp-complete"]);
        });
    },
    (error) => {
      this.modalIncorectVerification();
      console.log(error);
    })
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

  check(index: number, field: any, event: any): void {
    if (isNaN(parseInt(event.key, 10)) && event.key !== "Backspace") {
      event.preventDefault();
    }
    if (field.value && event.key !== "Backspace") {
      if (index < this.inputs.toArray().length - 1) {
        this.inputs.toArray()[index + 1].nativeElement.focus();
      }
    } else if (event.key === "Backspace") {
      if (index > 0) {
        field.setValue(null);
        this.inputs.toArray()[index - 1].nativeElement.focus();
      } 
    }
  }


}

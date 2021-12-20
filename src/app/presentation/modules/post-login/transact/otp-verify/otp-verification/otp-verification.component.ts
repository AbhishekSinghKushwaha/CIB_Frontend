import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { otpVerificationListModel } from 'src/app/core/domain/otp-verification-list.model';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';
import { Router } from '@angular/router';
import { GenerateOtpService } from 'src/app/core/services/generate-otp/generate-otp.service';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  otpVerificationType: otpVerificationListModel;
  otpVerificationForm: FormGroup;
  payload: any;

  constructor(
    private readonly otpVerificationListService: OtpVerificationListService,
    private readonly router: Router,
    private readonly generateOtpService: GenerateOtpService,
    private readonly buyGoodsService: BuyGoodsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.otpVerificationListService.selected.subscribe((response) => {
      this.otpVerificationForm.controls.otpVerificationType.setValue(response.verificationType);
      this.otpVerificationType = response;
    });
  }

  private initForm(): void {
    this.otpVerificationForm = new FormGroup({
      otpVerificationType: new FormControl(null, [Validators.required]),
    });
  }

  contactDetails() {
    this.router.navigate(['/transact/buy-goods/contact-details']);
  }

  getOtp() {
    this.buyGoodsService.currentData.subscribe(data => {
      this.payload = data;
      if(data) {
        this.generateOtpService.generateOtp(this.payload);
      }
    });
    console.log(this.payload,"1112");
  }

  submit() {
    if(this.otpVerificationType.verificationType === 'By sms') {

    this.router.navigate(['/transact/buy-goods/otp-verification-code',
    {
      'data': 'By sms',
    }
    ]);
    }
    else if(this.otpVerificationType.verificationType === 'By email') {
      this.router.navigate(['/transact/buy-goods/otp-verification-code',
    {
      'data': 'By email',
    }
    ]);
    }
  }

}

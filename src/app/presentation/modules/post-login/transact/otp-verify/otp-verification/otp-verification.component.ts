import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { otpVerificationListModel } from 'src/app/core/domain/otp-verification-list.model';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';
import { Router } from '@angular/router';
import { BuyGoodsService } from 'src/app/core/services/transfers/buy-goods/buy-goods.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  otpVerificationType: otpVerificationListModel;
  otpVerificationForm: FormGroup;
  payload: any;
  otpResent = false;

  constructor(
    private readonly otpVerificationListService: OtpVerificationListService,
    private readonly router: Router,
    private readonly buyGoodsService: BuyGoodsService,
    private readonly authService: AuthService
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

  submit() {
    if(this.otpVerificationType.verificationType === 'By sms') {

    this.router.navigate(['/transact/buy-goods/otp-verification-code',
    {
      'data': 'By sms',
    }
    ]);
    }
    else if(this.otpVerificationType.verificationType === 'By email') {
      this.authService.resendOTP().subscribe(
        (data) => {
          this.otpResent = true;
          this.router.navigate(['/transact/buy-goods/otp-verification-code',
          {
            'data': 'By email',
          }
          ]);
        },
        (error) => {
          console.log(error);
        }
      );
      
    }
  }

}

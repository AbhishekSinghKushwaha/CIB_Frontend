import { Injectable } from '@angular/core';
import { otpVerificationListModel } from './../../domain/otp-verification-list.model';

@Injectable()
export class OtpVerificationConstants {
  constructor() {}

  OTP_LIST: otpVerificationListModel[] = [
    {
        verificationType: 'By sms',
        imageLink: './assets/images/icons/visual-support-icon-mobile.svg',
        verificationValue: 'SMS',
        isSet: false
      },{
        verificationType: 'By email',
        imageLink: './assets/images/icons/visual-support-icons-email.svg',
        verificationValue: 'Email',
        isSet: false
      }
  ];
}

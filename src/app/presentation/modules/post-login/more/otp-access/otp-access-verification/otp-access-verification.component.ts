import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { otpCodeModel } from 'src/app/core/domain/otp-code.model';
import { OtpCodeService } from 'src/app/core/services/otp-code/otp-code.service';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';

@Component({
  selector: 'app-otp-access-verification',
  templateUrl: './otp-access-verification.component.html',
  styleUrls: ['./otp-access-verification.component.scss']
})
export class OtpAccessVerificationComponent implements OnInit {

  otpVerificationType: any;
  otpVerificationCodeForm: FormGroup;
  otpVerificationCode: otpCodeModel;

  transferType: any;
  sourceRoute: string;
  source:any;

  constructor(
    private readonly otpVerificationListService: OtpVerificationListService,
    private readonly otpCodeService: OtpCodeService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.otpVerificationType = route.snapshot.params["data"];
    this.transferType = route.snapshot.params["type"];
  }

  ngOnInit(): void {
    this.initForm();
    this.eventsSubscriptions();
  }

  private eventsSubscriptions(): void {
    this.otpCodeService.data.subscribe((response) => {
      this.otpVerificationCodeForm.controls.otpVerificationCode.setValue(
        response
      );
      this.otpVerificationCode = response;
    });
  }

  private initForm(): void {
    this.otpVerificationCodeForm = new FormGroup({
      otpVerificationCode: new FormControl(null, [Validators.required]),
    });
  }
}

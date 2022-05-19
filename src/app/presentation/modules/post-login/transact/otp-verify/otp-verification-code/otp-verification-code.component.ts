import { Component, OnInit } from "@angular/core";
import { otpVerificationListModel } from "src/app/core/domain/otp-verification-list.model";
import { OtpVerificationListService } from "src/app/core/services/otp-verification-list/otp-verification-list.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { OtpCodeService } from "src/app/core/services/otp-code/otp-code.service";
import { otpCodeModel } from "src/app/core/domain/otp-code.model";

@Component({
  selector: "app-otp-verification-code",
  templateUrl: "./otp-verification-code.component.html",
  styleUrls: ["./otp-verification-code.component.scss"],
})
export class OtpVerificationCodeComponent implements OnInit {
  otpVerificationType: any;
  otpVerificationCodeForm: FormGroup;
  otpVerificationCode: otpCodeModel;

  transferType: any;

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
    console.log(this.transferType);
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

import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-activity-otp-verification',
  templateUrl: './activity-otp-verification.component.html',
  styleUrls: ['./activity-otp-verification.component.scss']
})
export class ActivityOtpVerificationComponent implements OnInit {
  otpError: boolean;

  constructor(
    private readonly authService: AuthService,) { }

  ngOnInit(): void {
  }

  submit(otp: string) {
    this.otpError = false;
    if (otp) {
      this.authService.submitOTP(otp).subscribe(
        (response) => {
          if (response) {
            // this.authService.loginSuccess();
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

}

import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-virtual-account-sms-verification',
  templateUrl: './virtual-account-sms-verification.component.html',
  styleUrls: ['./virtual-account-sms-verification.component.scss']
})
export class VirtualAccountSmsVerificationComponent implements OnInit {
  @Output() onSubmit = new Subject<number>();

  constructor() { }

  ngOnInit(): void {
  }

  otpVerified(otp: string) {
    this.onSubmit.next(0);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { OtpCodeService } from 'src/app/core/services/otp-code/otp-code.service';

@Component({
  selector: 'app-otp-verification-confirmation',
  templateUrl: './otp-verification-confirmation.component.html',
  styleUrls: ['./otp-verification-confirmation.component.scss']
})
export class OtpVerificationConfirmationComponent implements OnInit {

  constructor(   
     private readonly router: Router,
     private readonly otpCodeService: OtpCodeService,
     readonly dialogRef: MatDialogRef<OtpVerificationConfirmationComponent>
     ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }


  submit() {
  localStorage.setItem('sourceRoute', 'more')
  this.router.navigate([`/more/otp-access-verify/${'sms'}/sms`]);
  this.close();
  }

}

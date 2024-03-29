import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CorporateService } from 'src/app/core/services/corporate/corporate.service';
import { OtpVerificationListService } from 'src/app/core/services/otp-verification-list/otp-verification-list.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';

@Component({
  selector: 'app-otp-verification-confirmation',
  templateUrl: './otp-verification-confirmation.component.html',
  styleUrls: ['./otp-verification-confirmation.component.scss']
})
export class OtpVerificationConfirmationComponent implements OnInit {
  selected: any;
  otpMethod: any;
  platformId: number;
  currentUser: any;

  constructor(   
     private readonly router: Router,
     private readonly corporateService: CorporateService,
     readonly dialogRef: MatDialogRef<OtpVerificationConfirmationComponent>,
     private readonly otpVerificationListService: OtpVerificationListService,
     private storageService: StorageService,
    private readonly authService: AuthService,

     ) {
      this.selected = otpVerificationListService.otpContent;
      }

  ngOnInit(): void {
     this.currentUser = this.storageService.getData('currentUserData');
  }

  close(): void {
    this.dialogRef.close(true);
  }


  submit() {
  this.platformId = this.currentUser.platformId;

  this.otpMethod = this.selected.length === 2 ? 'ALL' : this.selected[0]
  this.sendOtp();
  
  }

  sendOtp() {
    this.corporateService.sendOtp(this.platformId).subscribe((response:any) => {
      
        this.otpMethod === 'SMS' ? this.storageService.removeData('otp_message'): this.authService.setOTPMessage(response.message) ;
        this.router.navigate([`/more/otp-access/verify/${this.otpMethod}`]);
        this.close();
      },
      (error) => {
        console.log(error);
      }
    )
  }

}

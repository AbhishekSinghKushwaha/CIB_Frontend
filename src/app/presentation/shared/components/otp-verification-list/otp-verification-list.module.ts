import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpVerificationListComponent } from './otp-verification-list.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    OtpVerificationListComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    OtpVerificationListComponent
  ]
})
export class OtpVerificationListModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpVerificationSelectComponent } from './otp-verification-select.component';
import { OtpVerificationListModule } from '../../components/otp-verification-list/otp-verification-list.module'
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpVerificationConstants } from 'src/app/core/utils/constants/otp-verification-list.constants';

@NgModule({
  declarations: [
    OtpVerificationSelectComponent
  ],
  imports: [
    CommonModule,
    OtpVerificationListModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    OtpVerificationSelectComponent
  ],
  providers: [
    OtpVerificationConstants
  ]
})
export class OtpVerificationSelectModule { }

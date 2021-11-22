import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpVerificationCodeRoutingModule } from './otp-verification-code-routing.module';
import { OtpVerificationCodeComponent } from './otp-verification-code.component';
import { VerifyByCodeModule } from 'src/app/presentation/shared/modals/verify-by-code/verify-by-code.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OtpVerificationCodeComponent
  ],
  imports: [
    CommonModule,
    OtpVerificationCodeRoutingModule,
    VerifyByCodeModule,
    MatStyleModule,
    FormElementsModule,
    ReactiveFormsModule
  ]
})
export class OtpVerificationCodeModule { }

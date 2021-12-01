import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpVerificationRoutingModule } from './otp-verification-routing.module';
import { OtpVerificationComponent } from './otp-verification.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { OtpVerificationSelectModule } from 'src/app/presentation/shared/modals/otp-verification-select/otp-verification-select.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OtpVerificationComponent
  ],
  imports: [
    CommonModule,
    OtpVerificationRoutingModule,
    MatStyleModule,
    OtpVerificationSelectModule,
    FormElementsModule,
    ReactiveFormsModule
  ]
})
export class OtpVerificationModule { }

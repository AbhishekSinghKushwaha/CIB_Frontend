import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyOtpCodeComponent } from './verify-otp-code/verify-otp-code.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OtpVerificationConstants } from 'src/app/core/utils/constants/otp-verification-list.constants';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SnackbarModule } from 'src/app/presentation/shared/components/snackbar/snackbar.module';
import { OtpVerificationConfirmationModule } from 'src/app/presentation/shared/modals/otp-verification-confirmation/otp-verification-confirmation.module';
import { VerifyByCodeModule } from 'src/app/presentation/shared/modals/verify-by-code/verify-by-code.module';
import { OtpAccessVerificationComponent } from './otp-access-verification/otp-access-verification.component';
import { OtpSuccessComponent } from './otp-success/otp-success.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { OtpAccessRoutingModule } from './otp-access-routing.module';



@NgModule({
  declarations: [

    OtpVerificationComponent,
    OtpSuccessComponent,
    OtpAccessVerificationComponent,
    VerifyOtpCodeComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SnackbarModule,
    SharedComponentsModule,
    OtpAccessRoutingModule,
    OtpVerificationConfirmationModule,
    VerifyByCodeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [

    OtpVerificationConstants
  ]
})
export class OtpAccessModule { }


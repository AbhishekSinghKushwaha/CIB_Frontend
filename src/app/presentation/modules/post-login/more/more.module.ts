import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoreRoutingModule } from './more-routing.module';
import { MoreComponent } from './more.component';
import { MoreConstants } from '../../../../core/utils/constants/more.constants';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SnackbarModule } from 'src/app/presentation/shared/components/snackbar/snackbar.module';
import { OtpVerificationComponent } from './otp-access/otp-verification/otp-verification.component';
import { OtpVerificationListModule } from 'src/app/presentation/shared/components/otp-verification-list/otp-verification-list.module';
import { OtpVerificationConstants } from 'src/app/core/utils/constants/otp-verification-list.constants';
import { OtpVerificationConfirmationModule } from 'src/app/presentation/shared/modals/otp-verification-confirmation/otp-verification-confirmation.module';
import { OtpSuccessComponent } from './otp-access/otp-success/otp-success.component';
import { OtpAccessVerificationComponent } from './otp-access/otp-access-verification/otp-access-verification.component';
import { VerifyByCodeModule } from 'src/app/presentation/shared/modals/verify-by-code/verify-by-code.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecuritySettingsComponent } from './components/security-settings/security-settings.component';

@NgModule({
  declarations: [
MoreComponent,
    OtpVerificationComponent,
    OtpSuccessComponent,
    OtpAccessVerificationComponent,
    SecuritySettingsComponent,
  ],
  imports: [
    CommonModule,
    MoreRoutingModule,
    MatStyleModule,
    SnackbarModule,
    SharedComponentsModule,
    // OtpVerificationListModule,
    OtpVerificationConfirmationModule,
    VerifyByCodeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    MoreConstants,
    OtpVerificationConstants
  ]
})
export class MoreModule { }

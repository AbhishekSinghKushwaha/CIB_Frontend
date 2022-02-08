import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLoginRoutingModule } from './customer-login-routing.module';
import { CustomerLoginComponent } from './customer-login.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SmsVerificationGuard } from 'src/app/core/utils/guards/sms-verification/sms-verification.guard';
import { SecurityVerificationGuard } from 'src/app/core/utils/guards/security-verification/security-verification.guard';
import { SecurityChallengeGuard } from 'src/app/core/utils/guards/security-challenge/security-challenge.guard';

@NgModule({
  declarations: [CustomerLoginComponent],
  imports: [
    CommonModule,
    CustomerLoginRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
  ],
  providers: [
    SmsVerificationGuard,
    SecurityVerificationGuard,
    SecurityChallengeGuard,
  ],
})
export class CustomerLoginModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreLoginRoutingModule } from './pre-login-routing.module';
import { PreLoginComponent } from './pre-login.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { LayoutModule } from '../../layout/layout.module';
import { FormElementsModule } from '../../shared/form-elements/form-elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmsVerificationGuard } from 'src/app/core/utils/guards/sms-verification/sms-verification.guard';
import { SecurityVerificationGuard } from 'src/app/core/utils/guards/security-verification/security-verification.guard';
import { SecurityChallengeGuard } from 'src/app/core/utils/guards/security-challenge/security-challenge.guard';
import { LoginGuard } from 'src/app/core/utils/guards/login/login.guard';

@NgModule({
  declarations: [
    PreLoginComponent
  ],
  imports: [
    CommonModule,
    PreLoginRoutingModule,
    SharedComponentsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule
  ],
  providers: [SecurityChallengeGuard, SecurityVerificationGuard, SmsVerificationGuard]
})
export class PreLoginModule { }

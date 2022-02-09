import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginSmsVerificationRoutingModule } from './login-sms-verification-routing.module';
import { LoginSmsVerificationComponent } from './login-sms-verification.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NotificationModalModule } from 'src/app/presentation/shared/modals/notification-modal/notification-modal.module';

@NgModule({
  declarations: [LoginSmsVerificationComponent],
  imports: [
    CommonModule,
    LoginSmsVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
    SharedComponentsModule,
  ],
})
export class LoginSmsVerificationModule {}

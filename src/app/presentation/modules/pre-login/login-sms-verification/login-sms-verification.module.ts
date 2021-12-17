import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalModule } from '../../../shared/modals/notification-modal/notification-modal.module';
import { MatStyleModule } from '../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginSmsVerificationRoutingModule } from './login-sms-verification-routing.module';
import { LoginSmsVerificationComponent } from './login-sms-verification.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';


@NgModule({
  declarations: [
    LoginSmsVerificationComponent
  ],
  imports: [
    CommonModule,
    LoginSmsVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
    SharedComponentsModule
  ]
})
export class LoginSmsVerificationModule { }

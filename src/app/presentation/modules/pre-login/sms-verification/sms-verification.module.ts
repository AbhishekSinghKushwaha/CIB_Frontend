import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalModule } from './../../../shared/components/notification-modal/notification-modal.module';
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SmsVerificationRoutingModule } from './sms-verification-routing.module';
import { SmsVerificationComponent } from './sms-verification.component';


@NgModule({
  declarations: [
    SmsVerificationComponent
  ],
  imports: [
    CommonModule,
    SmsVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule
  ]
})
export class SmsVerificationModule { }

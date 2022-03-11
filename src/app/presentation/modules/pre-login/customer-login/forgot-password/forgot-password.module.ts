import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationModalModule } from 'src/app/presentation/shared/modals/notification-modal/notification-modal.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
    SharedComponentsModule
  ],
})
export class ForgotPasswordModule { }

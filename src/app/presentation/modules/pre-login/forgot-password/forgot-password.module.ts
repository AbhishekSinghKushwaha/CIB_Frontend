import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ValidateCredentialsComponent } from './components/validate-credentials/validate-credentials.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationModalModule } from 'src/app/presentation/shared/modals/notification-modal/notification-modal.module';

@NgModule({
  declarations: [ValidateCredentialsComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
  ],
})
export class ForgotPasswordModule {}

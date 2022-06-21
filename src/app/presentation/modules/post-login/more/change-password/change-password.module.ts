import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationModalModule } from 'src/app/presentation/shared/modals/notification-modal/notification-modal.module';
import { ChangePasswordComponent } from './change-password.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';

@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
    SharedComponentsModule
  ],
})
export class ChangePasswordModule { }

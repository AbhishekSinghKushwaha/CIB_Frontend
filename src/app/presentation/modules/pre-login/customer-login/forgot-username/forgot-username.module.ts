import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotUsernameRoutingModule } from './forgot-username-routing.module';
import { ForgotUsernameComponent } from './forgot-username.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { NotificationModalModule } from 'src/app/presentation/shared/modals/notification-modal/notification-modal.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgotUsernameComponent
  ],
  imports: [
    CommonModule,
    ForgotUsernameRoutingModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
    SharedComponentsModule
  ]
})
export class ForgotUsernameModule { }

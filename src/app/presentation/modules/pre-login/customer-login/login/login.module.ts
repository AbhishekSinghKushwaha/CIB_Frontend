import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NotificationModalModule } from '../../../../shared/modals/notification-modal/notification-modal.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
  ],
})
export class LoginModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NotificationModalModule } from '../../../../shared/modals/notification-modal/notification-modal.module';
import { LanguageTranslateModule } from 'src/app/translate.module';
import { DropdownListModalModule } from 'src/app/presentation/shared/modals/dropdown-list-modal/dropdown-list-modal.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    NotificationModalModule,
    LanguageTranslateModule.forRoot(),
    DropdownListModalModule,
    SharedComponentsModule
  ],
})
export class LoginModule { }

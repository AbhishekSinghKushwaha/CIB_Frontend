import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageInputComponent } from './language-input/language-input.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { RegisterButtonFooterComponent } from './register-button-footer/register-button-footer.component';
import { LogoutButtonFooterComponent } from './logout-button-footer/logout-button-footer.component';
import { TransactMenuItemComponent } from './transact-menu-item/transact-menu-item.component';
import { SmsVerificationComponent } from './sms-verification/sms-verification.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

const components = [
  LanguageInputComponent,
  CustomerSupportComponent,
  RegisterButtonFooterComponent,
  LogoutButtonFooterComponent,
  TransactMenuItemComponent,
  SmsVerificationComponent,
  EmailVerificationComponent,

];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule
  ],
  exports: components
})
export class SharedComponentsModule { }

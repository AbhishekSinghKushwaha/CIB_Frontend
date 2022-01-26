import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LanguageInputComponent } from './language-input/language-input.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { RegisterButtonFooterComponent } from './register-button-footer/register-button-footer.component';
import { LogoutButtonFooterComponent } from './logout-button-footer/logout-button-footer.component';
import { TransactMenuItemComponent } from './transact-menu-item/transact-menu-item.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { SmsVerificationComponent } from './sms-verification/sms-verification.component';
import { AccountDropdownItemComponent } from './account-dropdown-item/account-dropdown-item.component';
import { BeneficiaryListItemComponent } from './beneficiary-list-item/beneficiary-list-item.component';
import { NotificationMenuItemComponent } from './notification-menu-item/notification-menu-item.component';

const components = [
  AccountDropdownItemComponent,
  LanguageInputComponent,
  CustomerSupportComponent,
  RegisterButtonFooterComponent,
  LogoutButtonFooterComponent,
  TransactMenuItemComponent,
  SmsVerificationComponent,
  EmailVerificationComponent,
  BeneficiaryListItemComponent,
  NotificationMenuItemComponent,
];

@NgModule({
  declarations: components,
  imports: [CommonModule, MatStyleModule, ReactiveFormsModule],
  exports: components,
})
export class SharedComponentsModule {}

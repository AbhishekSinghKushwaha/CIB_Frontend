import { GroupedAccountItemComponent } from './grouped-account-item/grouped-account-item.component';

import { RouterModule } from '@angular/router';
import { CardComponentComponent } from './card-component/card-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { WelcomeInfoComponent } from './welcome-info/welcome-info.component';
import { ConfirmationCompletionComponent } from './confirmation-completion/confirmation-completion.component';
import { LogoutWarningModalComponent } from './logout-warning-modal/logout-warning-modal.component';
import { LogoutConfirmationModalComponent } from './logout-confirmation-modal/logout-confirmation-modal.component';
import { LanguageModalModule } from '../modals/language-modal/language-modal.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LanguageTranslateModule } from 'src/app/translate.module';
import { SecurityVerificationComponent } from './security-verification/security-verification.component';
import { SecurityChallengeComponent } from './security-challenge/security-challenge.component';
import { SecurityQuestionsModalModule } from '../modals/security-questions-modal/security-questions-modal.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { DeleteModule } from '../modals/delete/delete.module';
import { StandingOrdersListComponent } from './standing-orders-list/standing-orders-list.component';

const components = [
  AccountDropdownItemComponent,
  LanguageInputComponent,
  CustomerSupportComponent,
  RegisterButtonFooterComponent,
  LogoutButtonFooterComponent,
  TransactMenuItemComponent,
  SmsVerificationComponent,
  EmailVerificationComponent,
  NotificationMenuItemComponent,
  CardComponentComponent,
  BeneficiaryListItemComponent,
  NotificationMenuItemComponent,
  WelcomeInfoComponent,
  ConfirmationCompletionComponent,
  LogoutWarningModalComponent,
  LogoutConfirmationModalComponent,
  SecurityVerificationComponent,
  SecurityChallengeComponent,
  ResetPasswordComponent,
  TransactionsListComponent,
  PaginatorComponent,
  ListItemsComponent,
  StandingOrdersListComponent,
  GroupedAccountItemComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    MatStyleModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LanguageModalModule,
    LanguageTranslateModule.forRoot(),
    SecurityQuestionsModalModule,
    DeleteModule
  ],
  exports: components
})
export class SharedComponentsModule { }

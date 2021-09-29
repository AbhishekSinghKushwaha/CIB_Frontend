import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageInputComponent } from './language-input/language-input.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { RegisterButtonFooterComponent } from './register-button-footer/register-button-footer.component';
import { LogoutButtonFooterComponent } from './logout-button-footer/logout-button-footer.component';



@NgModule({
  declarations: [
    LanguageInputComponent,
    CustomerSupportComponent,
    RegisterButtonFooterComponent,
    LogoutButtonFooterComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    LanguageInputComponent,
    CustomerSupportComponent,
    RegisterButtonFooterComponent,
    LogoutButtonFooterComponent
  ]
})
export class SharedComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageInputComponent } from './language-input/language-input.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    LanguageInputComponent,
    CustomerSupportComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    LanguageInputComponent,
    CustomerSupportComponent
  ]
})
export class SharedComponentsModule { }

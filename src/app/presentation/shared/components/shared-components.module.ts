import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageInputComponent } from './language-input/language-input.component';
import { CustomerSupportComponent } from './customer-support/customer-support.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BasicListComponent } from './basic-list/basic-list.component';



@NgModule({
  declarations: [
    LanguageInputComponent,
    CustomerSupportComponent,
    BasicListComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    LanguageInputComponent,
    CustomerSupportComponent,
    BasicListComponent
  ]
})
export class SharedComponentsModule { }

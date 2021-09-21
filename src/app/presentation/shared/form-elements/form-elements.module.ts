import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    InputComponent,
    PasswordInputComponent,
    FieldErrorsComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports: [
    InputComponent,
    PasswordInputComponent,
    FieldErrorsComponent
  ]
})
export class FormElementsModule { }

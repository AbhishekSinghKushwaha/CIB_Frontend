import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { TransferFromComponent } from './transfer-from/transfer-from.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferToComponent } from './transfer-to/transfer-to.component';
import { SchedulePaymentInputComponent } from './schedule-payment-input/schedule-payment-input.component';
import { SelectBankComponent } from './select-bank/select-bank.component';
import { PhoneNumberInputComponent } from './phone-number-input/phone-number-input.component';
import { SwiftChargesComponent } from './swift-charges/swift-charges.component';
import { PaymentCategoryComponent } from './payment-category/payment-category.component';

@NgModule({
  declarations: [
    InputComponent,
    PasswordInputComponent,
    FieldErrorsComponent,
    TransferAmountComponent,
    TransferFromComponent,
    TransferToComponent,
    SchedulePaymentInputComponent,
    SelectBankComponent,
    PhoneNumberInputComponent,
    SwiftChargesComponent,
    PaymentCategoryComponent,
  ],
  imports: [CommonModule, MatStyleModule, FormsModule, ReactiveFormsModule],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    PasswordInputComponent,
    FieldErrorsComponent,
    TransferAmountComponent,
    TransferFromComponent,
    TransferToComponent,
    SchedulePaymentInputComponent,
    SelectBankComponent,
    PhoneNumberInputComponent,
    SwiftChargesComponent,
    PaymentCategoryComponent,
  ],
})
export class FormElementsModule {}

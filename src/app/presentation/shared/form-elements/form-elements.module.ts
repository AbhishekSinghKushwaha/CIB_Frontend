import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { PasswordInputComponent } from './password-input/password-input.component';
import { FieldErrorsComponent } from './field-errors/field-errors.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { TransferAmountComponent } from './transfer-amount/transfer-amount.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransferToComponent } from './transfer-to/transfer-to.component';
import { SchedulePaymentInputComponent } from './schedule-payment-input/schedule-payment-input.component';
import { SelectBankComponent } from './select-bank/select-bank.component';
import { PhoneNumberInputComponent } from './phone-number-input/phone-number-input.component';
import { SwiftChargesComponent } from './swift-charges/swift-charges.component';
import { PaymentCategoryComponent } from './payment-category/payment-category.component';
import { CountrySelectInputComponent } from './country-select-input/country-select-input.component';
import { TransferFromComponent } from './transfer-from/transfer-from.component';
import { TransferFromModalModule } from '../modals/transfer-from-modal/transfer-from-modal.module';
import { SelectNumberComponent } from './select-number/select-number.component';
import { NumberSelectModalModule } from '../modals/number-select-modal/number-select-modal.module';
import { CollectionOptionModalModule } from '../modals/collection-option-modal/collection-option-modal.module';
import { CollectionOptionComponent } from './collection-option/collection-option.component';
import { BranchModalModule } from '../modals/branch-modal/branch-modal.module';
import { UserListComponent } from './user-list/user-list.component';
import { CurrencySelectionModule } from '../modals/currency-selection/currency-selection.module';

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
    CountrySelectInputComponent,
    SelectNumberComponent,
    CollectionOptionComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    TransferFromModalModule,
    NumberSelectModalModule,
    CollectionOptionModalModule,
    BranchModalModule,
    CurrencySelectionModule],
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
    CountrySelectInputComponent,
    SelectNumberComponent,
    CollectionOptionComponent
  ],
  providers: [],
})
export class FormElementsModule { }

import { ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaryManagementFormRoutingModule } from './beneficiary-management-form-routing.module';
import { BeneficiaryManagementFormComponent } from './beneficiary-management-form.component';
import { BankModalModule } from 'src/app/presentation/shared/modals/bank-modal/bank-modal.module';
import { TransactionTypeModalModule } from 'src/app/presentation/shared/modals/transaction-type-modal/transaction-type-modal.module';


@NgModule({
  declarations: [
    BeneficiaryManagementFormComponent
  ],
  imports: [
    CommonModule,
    BeneficiaryManagementFormRoutingModule,
    MatStyleModule,
    BankModalModule,
    ReactiveFormsModule,
    TransactionTypeModalModule
  ]
})
export class BeneficiaryManagementFormModule { }

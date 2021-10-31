import { ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaryManagementRoutingModule } from './beneficiary-management-routing.module';
import { BeneficiaryManagementComponent } from './beneficiary-management.component';
import { TransactionTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { CountryService } from 'src/app/core/services/country/country.service';


@NgModule({
  declarations: [
    BeneficiaryManagementComponent,
  ],
  imports: [
    CommonModule,
    BeneficiaryManagementRoutingModule,
    MatStyleModule,
    ReactiveFormsModule,
  ],
  providers: [CountryService, BankService, TransactionTypeModalService],
})
export class BeneficiaryManagementModule { }

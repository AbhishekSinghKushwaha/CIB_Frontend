import { ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaryManagementRoutingModule } from './beneficiary-management-routing.module';
import { BeneficiaryManagementComponent } from './beneficiary-management.component';
import { TransactionTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';
import { BankService } from 'src/app/core/services/modal-services/bank.service';
import { CountryService } from 'src/app/core/services/modal-services/country.service';
import { BeneficiaryManagementService } from 'src/app/core/services/beneficiary-management/beneficiary-management.service';
import { ConfirmDialogModule } from 'src/app/presentation/shared/modals/confirm-dialog/confirm-dialog.module';

@NgModule({
  declarations: [BeneficiaryManagementComponent],
  imports: [
    CommonModule,
    BeneficiaryManagementRoutingModule,
    MatStyleModule,
    ReactiveFormsModule,
    ConfirmDialogModule,
  ],
  providers: [
    CountryService,
    BankService,
    TransactionTypeModalService,
    BeneficiaryManagementService,
  ],
})
export class BeneficiaryManagementModule {}

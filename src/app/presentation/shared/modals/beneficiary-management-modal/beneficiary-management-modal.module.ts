import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BeneficiaryManagementModalComponent } from './beneficiary-management-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BeneficiaryManagementModalService } from 'src/app/core/services/beneficiary-management-modal/beneficiary-management-modal.service';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { BeneficiaryManagementFormModalModule } from '../beneficiary-management-form-modal/beneficiary-management-form-modal.module';
import { PipesModule } from '../../pipes/pipes.module';
import { SharedComponentsModule } from '../../components/shared-components.module';

@NgModule({
  declarations: [BeneficiaryManagementModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedComponentsModule,
    PipesModule,
    MatStyleModule,
    ConfirmDialogModule,
    BeneficiaryManagementFormModalModule,
  ],
  exports: [BeneficiaryManagementModalComponent],
  providers: [BeneficiaryManagementModalService],
})
export class BeneficiaryManagementModalModule {}

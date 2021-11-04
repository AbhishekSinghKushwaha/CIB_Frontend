import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryManagementFormModalComponent } from './beneficiary-management-form-modal.component';
import { BeneficiaryManagementFormModalService } from 'src/app/core/services/beneficiary-management-form-modal/beneficiary-management-form-modal.service';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    BeneficiaryManagementFormModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  providers: [
    BeneficiaryManagementFormModalService
  ],
  exports: [
    BeneficiaryManagementFormModalComponent
  ],
})
export class BeneficiaryManagementFormModalModule { }

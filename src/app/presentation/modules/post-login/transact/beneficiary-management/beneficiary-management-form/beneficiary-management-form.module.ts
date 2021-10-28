import { ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaryManagementFormRoutingModule } from './beneficiary-management-form-routing.module';
import { BeneficiaryManagementFormComponent } from './beneficiary-management-form.component';


@NgModule({
  declarations: [
    BeneficiaryManagementFormComponent
  ],
  imports: [
    CommonModule,
    BeneficiaryManagementFormRoutingModule,
    MatStyleModule,
    ReactiveFormsModule,
  ],
})
export class BeneficiaryManagementFormModule { }

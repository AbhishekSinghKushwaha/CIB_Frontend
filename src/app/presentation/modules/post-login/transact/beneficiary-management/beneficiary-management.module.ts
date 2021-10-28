import { ReactiveFormsModule } from '@angular/forms';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaryManagementRoutingModule } from './beneficiary-management-routing.module';
import { BeneficiaryManagementComponent } from './beneficiary-management.component';


@NgModule({
  declarations: [
    BeneficiaryManagementComponent,
  ],
  imports: [
    CommonModule,
    BeneficiaryManagementRoutingModule,
    MatStyleModule,
    ReactiveFormsModule,
  ]
})
export class BeneficiaryManagementModule { }

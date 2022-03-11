import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AirtimeSuccessRoutingModule } from './airtime-success-routing.module';
import { AirtimeSuccessComponent } from './airtime-success.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBeneficiaryModule } from './add-beneficiary/add-beneficiary.module';
import { BeneficiaryAddedModule } from './beneficiary-added/beneficiary-added.module';
import { AirtimeFailedModule } from './airtime-failed/airtime-failed.module';

@NgModule({
  declarations: [
    AirtimeSuccessComponent
  ],
  imports: [
    CommonModule,
    AirtimeSuccessRoutingModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    AddBeneficiaryModule,
    BeneficiaryAddedModule,
    AirtimeFailedModule
  ]
})
export class AirtimeSuccessModule { }

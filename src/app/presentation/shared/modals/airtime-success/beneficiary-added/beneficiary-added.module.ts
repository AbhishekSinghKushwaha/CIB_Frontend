import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryAddedComponent } from './beneficiary-added.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BeneficiaryAddedService } from 'src/app/core/services/beneficiary-added/beneficiary-added.service';


@NgModule({
  declarations: [
    BeneficiaryAddedComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BeneficiaryAddedComponent
  ],
  providers: [
    BeneficiaryAddedService
  ]
})
export class BeneficiaryAddedModule { }

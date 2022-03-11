import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBeneficiaryComponent } from './add-beneficiary.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBeneficiaryService } from 'src/app/core/services/add-beneficiary/add-beneficiary.service';


@NgModule({
  declarations: [
    AddBeneficiaryComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatStyleModule,
    ReactiveFormsModule,
  ],
  exports: [
    AddBeneficiaryComponent
  ],
  providers: [
    AddBeneficiaryService
  ]
})
export class AddBeneficiaryModule { }

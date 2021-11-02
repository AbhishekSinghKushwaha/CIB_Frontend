import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeneficiaryListItemComponent } from './beneficiary-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [
    BeneficiaryListItemComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports: [
    BeneficiaryListItemComponent
  ]
})
export class BeneficiaryListItemModule { }

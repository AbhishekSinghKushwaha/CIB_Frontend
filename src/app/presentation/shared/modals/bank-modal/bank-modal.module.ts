import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankModalComponent } from './bank-modal.component';
import { BankListItemComponent } from '../../components/bank-list-item/bank-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { CountrySelectModule } from '../../components/country-select/country-select.module';



@NgModule({
  declarations: [
    BankModalComponent,
    BankListItemComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    CountrySelectModule,
  ],
  exports: [
    BankModalComponent,
  ],
  providers: [
    BankService
  ]
})
export class BankModalModule { }

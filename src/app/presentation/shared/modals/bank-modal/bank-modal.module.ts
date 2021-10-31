import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BankModalComponent } from './bank-modal.component';
import { BankListItemComponent } from '../../components/bank-list-item/bank-list-item.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { BankService } from 'src/app/core/services/bank/bank.service';
import { CountryModalModule } from '../country-modal/country-modal.module';
import { BankSearchPipe } from '../../pipes/bank-search/bank-search.pipe';



@NgModule({
  declarations: [
    BankModalComponent,
    BankListItemComponent,
    BankSearchPipe
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    CountryModalModule,
  ],
  exports: [
    BankModalComponent,
  ],
  providers: [
    BankService
  ]
})
export class BankModalModule { }

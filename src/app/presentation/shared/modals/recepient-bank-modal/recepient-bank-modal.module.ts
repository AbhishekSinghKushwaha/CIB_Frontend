import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecepientBankModalComponent } from './recepient-bank-modal.component';
import { MatStyleModule } from './../../../../mat-style.module';
import { RecepientBankService } from 'src/app/core/services/recepient-bank/recepient-bank.service';
import { BankSelectionModule } from '../bank-selection/bank-selection.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RecepientBankModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    FormsModule,
    ReactiveFormsModule,
    BankSelectionModule
  ],
  exports: [
    RecepientBankModalComponent
  ],
  providers: [RecepientBankService]
})
export class RecepientBankModalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectTransactionTypeComponent } from './select-transaction-type.component';
import { SelectTransactionTypeListComponent } from './select-transaction-type-list/select-transaction-type-list.component';
import { TransactionTypeService } from 'src/app/core/services/transaction-type/transaction-type.service';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    SelectTransactionTypeComponent,
    SelectTransactionTypeListComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    SelectTransactionTypeComponent,
  ],
  providers: [
    TransactionTypeService
  ]
})
export class SelectTransactionTypeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionTypeModalComponent } from './transaction-type-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { TransactionTypeListItemComponent } from './transaction-type-list-item/transaction-type-list-item.component';
import { TransactionTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';



@NgModule({
  declarations: [
    TransactionTypeModalComponent,
    TransactionTypeListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    TransactionTypeModalComponent
  ],
  providers: [
    TransactionTypeModalService
  ]
})
export class TransactionTypeModalModule { }

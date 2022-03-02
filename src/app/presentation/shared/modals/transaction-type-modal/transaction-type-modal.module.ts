import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionTypeModalComponent } from './transaction-type-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { TransactionTypeListItemComponent } from './transaction-type-list-item/transaction-type-list-item.component';
import { TransferTypeModalService } from 'src/app/core/services/transaction-type-modal/transaction-type-modal.service';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    TransactionTypeModalComponent,
    TransactionTypeListItemComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    TranslateModule.forRoot()
  ],
  exports: [
    TransactionTypeModalComponent
  ],
  providers: [
    TransferTypeModalService
  ]
})
export class TransactionTypeModalModule { }

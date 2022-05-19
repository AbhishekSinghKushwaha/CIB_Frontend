import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionReceiptModalComponent } from './transaction-receipt-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from '../../components/shared-components.module';



@NgModule({
  declarations: [
    TransactionReceiptModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule

  ]
})
export class TransactionReceiptModalModule { }

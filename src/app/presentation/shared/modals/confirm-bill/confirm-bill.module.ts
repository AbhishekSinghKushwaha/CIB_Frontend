import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmBillComponent } from './confirm-bill.component';
import { MatStyleModule } from 'src/app/mat-style.module';



@NgModule({
  declarations: [
    ConfirmBillComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports: [
    ConfirmBillComponent
  ]
})
export class ConfirmBillModule { }

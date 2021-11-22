import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompleteTransferRoutingModule } from './complete-transfer-routing.module';
import { CompleteTransferComponent } from './complete-transfer.component';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    CompleteTransferComponent
  ],
  imports: [
    CommonModule,
    CompleteTransferRoutingModule,
    MatStyleModule
  ]
})
export class CompleteTransferModule { }

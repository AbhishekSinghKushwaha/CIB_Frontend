import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkTransferDetailRoutingModule } from './bulk-transfer-detail-routing.module';
import { BulkTransferDetailComponent } from './bulk-transfer-detail.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [
    BulkTransferDetailComponent
  ],
  imports: [
    CommonModule,
    BulkTransferDetailRoutingModule,
    MatStyleModule
  ],
  exports: [
    BulkTransferDetailComponent
  ]
})
export class BulkTransferDetailModule { }

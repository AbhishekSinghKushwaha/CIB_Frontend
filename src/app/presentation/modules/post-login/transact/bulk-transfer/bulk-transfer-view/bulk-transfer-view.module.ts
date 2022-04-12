import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkTransferViewRoutingModule } from './bulk-transfer-view-routing.module';
import { BulkTransferViewComponent } from './bulk-transfer-view.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [
    BulkTransferViewComponent
  ],
  imports: [
    CommonModule,
    BulkTransferViewRoutingModule,
    MatStyleModule
  ]
})
export class BulkTransferViewModule { }

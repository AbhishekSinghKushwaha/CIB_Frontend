import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkTransferRoutingModule } from './bulk-transfer-routing.module';
import { BulkTransferComponent } from './bulk-transfer.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { DownloadTemplateModule } from 'src/app/presentation/shared/modals/download-template/download-template.module';

@NgModule({
  declarations: [
    BulkTransferComponent
  ],
  imports: [
    CommonModule,
    BulkTransferRoutingModule,
    SharedComponentsModule,
    SharedModalsModule,
    MatStyleModule,
    FormElementsModule,
    DownloadTemplateModule
  ]
})
export class BulkTransferModule { }

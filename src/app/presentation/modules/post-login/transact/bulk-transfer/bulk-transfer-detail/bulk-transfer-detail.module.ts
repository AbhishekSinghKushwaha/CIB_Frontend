import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkTransferDetailRoutingModule } from './bulk-transfer-detail-routing.module';
import { BulkTransferDetailComponent } from './bulk-transfer-detail.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BulkTransferDetailComponent
  ],
  imports: [
    CommonModule,
    BulkTransferDetailRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    FormElementsModule,
    SharedModalsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BulkTransferDetailComponent
  ]
})
export class BulkTransferDetailModule { }

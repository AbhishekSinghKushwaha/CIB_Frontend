import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkTransferViewRoutingModule } from './bulk-transfer-view-routing.module';
import { BulkTransferViewComponent } from './bulk-transfer-view.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BulkTransferViewComponent
  ],
  imports: [
    CommonModule,
    BulkTransferViewRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    FormElementsModule,
    SharedModalsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BulkTransferViewModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntercountryFundTransferRoutingModule } from './intercountry-fund-transfer-routing.module';
import { IntercountryFundTransferComponent } from './intercountry-fund-transfer.component';

import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';

@NgModule({
  declarations: [IntercountryFundTransferComponent],
  imports: [
    CommonModule,
    IntercountryFundTransferRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    FormElementsModule,
    SharedModalsModule
  ],
  providers: [],
})
export class IntercountryFundTransferModule {}

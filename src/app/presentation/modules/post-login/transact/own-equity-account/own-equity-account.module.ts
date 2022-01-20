import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnEquityAccountRoutingModule } from './own-equity-account-routing.module';
import { OwnEquityAccountComponent } from './own-equity-account.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';

@NgModule({
  declarations: [OwnEquityAccountComponent],
  imports: [
    CommonModule,
    OwnEquityAccountRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SharedModalsModule,
    FormElementsModule,
  ],
  providers: [],
})
export class OwnEquityAccountModule {}

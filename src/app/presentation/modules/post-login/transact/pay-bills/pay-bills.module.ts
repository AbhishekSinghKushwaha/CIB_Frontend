import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayBillsRoutingModule } from './pay-bills-routing.module';
import { PayBillsComponent } from './pay-bills.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';

@NgModule({
  declarations: [
    PayBillsComponent
  ],
  imports: [
    CommonModule,
    PayBillsRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    SharedModalsModule,
    FormElementsModule,
  ]
})
export class PayBillsModule { }

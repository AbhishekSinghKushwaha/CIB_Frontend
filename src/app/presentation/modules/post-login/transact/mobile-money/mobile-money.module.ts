import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileMoneyRoutingModule } from './mobile-money-routing.module';
import { MobileMoneyComponent } from './mobile-money.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';

@NgModule({
  declarations: [MobileMoneyComponent],
  imports: [
    CommonModule,
    MobileMoneyRoutingModule,
    SharedComponentsModule,
    SharedModalsModule,
    MatStyleModule,
    FormElementsModule,
  ],
})
export class MobileMoneyModule {}

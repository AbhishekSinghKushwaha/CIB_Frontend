import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandingOrdersDetailRoutingModule } from './standing-orders-detail-routing.module';
import { StandingOrdersDetailComponent } from './standing-orders-detail.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    StandingOrdersDetailComponent
  ],
  imports: [
    CommonModule,
    StandingOrdersDetailRoutingModule,
    SharedComponentsModule,
    MatStyleModule
  ],
  exports: [
    StandingOrdersDetailComponent
  ]
})
export class StandingOrdersDetailModule { }

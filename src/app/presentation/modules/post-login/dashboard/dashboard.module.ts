import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardConstants } from '../../../../core/utils/constants/dashboard.constants';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    MatStyleModule
  ],
  providers: [DashboardConstants]
})
export class DashboardModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnEquityAccountRoutingModule } from './own-equity-account-routing.module';
import { OwnEquityAccountComponent } from './own-equity-account.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';


@NgModule({
  declarations: [
    OwnEquityAccountComponent
  ],
  imports: [
    CommonModule,
    OwnEquityAccountRoutingModule,
    SharedComponentsModule,
    MatStyleModule
  ]
})
export class OwnEquityAccountModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MobileMoneyRoutingModule } from './mobile-money-routing.module';
import { MobileMoneyComponent } from './mobile-money.component';


@NgModule({
  declarations: [
    MobileMoneyComponent
  ],
  imports: [
    CommonModule,
    MobileMoneyRoutingModule
  ]
})
export class MobileMoneyModule { }

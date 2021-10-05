import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyAirtimeRoutingModule } from './buy-airtime-routing.module';
import { BuyAirtimeComponent } from './buy-airtime.component';


@NgModule({
  declarations: [
    BuyAirtimeComponent
  ],
  imports: [
    CommonModule,
    BuyAirtimeRoutingModule
  ]
})
export class BuyAirtimeModule { }

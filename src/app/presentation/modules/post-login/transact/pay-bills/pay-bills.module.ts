import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayBillsRoutingModule } from './pay-bills-routing.module';
import { PayBillsComponent } from './pay-bills.component';


@NgModule({
  declarations: [
    PayBillsComponent
  ],
  imports: [
    CommonModule,
    PayBillsRoutingModule
  ]
})
export class PayBillsModule { }

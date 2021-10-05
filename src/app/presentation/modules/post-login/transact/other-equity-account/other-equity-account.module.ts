import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherEquityAccountRoutingModule } from './other-equity-account-routing.module';
import { OtherEquityAccountComponent } from './other-equity-account.component';


@NgModule({
  declarations: [
    OtherEquityAccountComponent
  ],
  imports: [
    CommonModule,
    OtherEquityAccountRoutingModule
  ]
})
export class OtherEquityAccountModule { }

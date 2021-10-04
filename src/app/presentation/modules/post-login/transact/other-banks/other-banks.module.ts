import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherBanksRoutingModule } from './other-banks-routing.module';
import { OtherBanksComponent } from './other-banks.component';


@NgModule({
  declarations: [
    OtherBanksComponent
  ],
  imports: [
    CommonModule,
    OtherBanksRoutingModule
  ]
})
export class OtherBanksModule { }

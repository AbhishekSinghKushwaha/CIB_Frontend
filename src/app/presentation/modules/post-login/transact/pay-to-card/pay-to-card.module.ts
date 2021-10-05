import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayToCardRoutingModule } from './pay-to-card-routing.module';
import { PayToCardComponent } from './pay-to-card.component';


@NgModule({
  declarations: [
    PayToCardComponent
  ],
  imports: [
    CommonModule,
    PayToCardRoutingModule
  ]
})
export class PayToCardModule { }

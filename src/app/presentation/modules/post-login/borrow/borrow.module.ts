import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowComponent } from './borrow.component';


@NgModule({
  declarations: [
    BorrowComponent
  ],
  imports: [
    CommonModule,
    BorrowRoutingModule
  ]
})
export class BorrowModule { }

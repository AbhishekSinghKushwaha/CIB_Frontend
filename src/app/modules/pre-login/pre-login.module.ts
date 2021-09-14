import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreLoginRoutingModule } from './pre-login-routing.module';
import { PreLoginComponent } from './pre-login.component';


@NgModule({
  declarations: [
    PreLoginComponent
  ],
  imports: [
    CommonModule,
    PreLoginRoutingModule
  ]
})
export class PreLoginModule { }

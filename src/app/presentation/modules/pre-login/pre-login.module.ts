import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreLoginRoutingModule } from './pre-login-routing.module';
import { PreLoginComponent } from './pre-login.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { LayoutModule } from '../../layout/layout.module';

@NgModule({
  declarations: [
    PreLoginComponent
  ],
  imports: [
    CommonModule,
    PreLoginRoutingModule,
    SharedComponentsModule,
    LayoutModule
  ]
})
export class PreLoginModule { }

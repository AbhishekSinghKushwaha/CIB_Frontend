import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreLoginRoutingModule } from './pre-login-routing.module';
import { PreLoginComponent } from './pre-login.component';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { LayoutModule } from '../../layout/layout.module';
import { FormElementsModule } from '../../shared/form-elements/form-elements.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PreLoginComponent
  ],
  imports: [
    CommonModule,
    PreLoginRoutingModule,
    SharedComponentsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    FormElementsModule
  ]
})
export class PreLoginModule { }

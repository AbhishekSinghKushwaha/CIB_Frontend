import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLoginRoutingModule } from './customer-login-routing.module';
import { CustomerLoginComponent } from './customer-login.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';

@NgModule({
  declarations: [CustomerLoginComponent],
  imports: [CommonModule, CustomerLoginRoutingModule, SharedComponentsModule],
})
export class CustomerLoginModule {}

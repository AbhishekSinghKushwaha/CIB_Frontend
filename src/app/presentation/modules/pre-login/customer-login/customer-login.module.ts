import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerLoginRoutingModule } from './customer-login-routing.module';
import { CustomerLoginComponent } from './customer-login.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [CustomerLoginComponent],
  imports: [
    CommonModule,
    CustomerLoginRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
  ],
})
export class CustomerLoginModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualAccountRoutingModule } from './virtual-account-routing.module';
import { VirtualAccountComponent } from './virtual-account.component';
import { AccountCardModule } from 'src/app/presentation/shared/components/account-card/account-card.module';
import { VirtualAccountConstants } from 'src/app/core/utils/constants/virtual-account.constants';


@NgModule({
  declarations: [
    VirtualAccountComponent
  ],
  imports: [
    CommonModule,
    VirtualAccountRoutingModule,
    AccountCardModule
  ],
  providers: [
    VirtualAccountConstants
  ]
})
export class VirtualAccountModule { }

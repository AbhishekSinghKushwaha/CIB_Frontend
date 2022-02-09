import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawRoutingModule } from './withdraw-routing.module';
import { AgentWithdrawalComponent } from './agent-withdrawal/agent-withdrawal.component';
import { AtmWithdrawalComponent } from './atm-withdrawal/atm-withdrawal.component';


@NgModule({
  declarations: [
    AgentWithdrawalComponent,
    AtmWithdrawalComponent
  ],
  imports: [
    CommonModule,
    WithdrawRoutingModule
  ]
})
export class WithdrawModule { }

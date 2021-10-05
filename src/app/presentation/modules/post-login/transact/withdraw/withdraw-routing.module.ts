import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentWithdrawalComponent } from './agent-withdrawal/agent-withdrawal.component';
import { AtmWithdrawalComponent } from './atm-withdrawal/atm-withdrawal.component';

const routes: Routes = [
  {
    path: 'atm-withdrawal',
    component: AtmWithdrawalComponent
  },
  {
    path: 'agent-withdrawal',
    component: AgentWithdrawalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawRoutingModule { }

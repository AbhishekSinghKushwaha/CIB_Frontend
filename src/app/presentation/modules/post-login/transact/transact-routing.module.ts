import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendOwnEquityComponent } from './components/send-own-equity/send-own-equity.component';
import { TransactComponent } from './transact.component';

const routes: Routes = [
  {
    path: '',
    component: TransactComponent,
  },
  {
    path: 'send-own-equity',
    component: SendOwnEquityComponent,
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactRoutingModule { }

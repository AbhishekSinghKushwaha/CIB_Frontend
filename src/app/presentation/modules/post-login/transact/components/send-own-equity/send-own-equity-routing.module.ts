import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendOwnEquityComponent } from './send-own-equity.component';

const routes: Routes = [{
  path: '',
  component: SendOwnEquityComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SendOwnEquityRoutingModule { }

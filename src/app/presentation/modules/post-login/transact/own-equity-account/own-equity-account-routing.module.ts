import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnEquityAccountComponent } from './own-equity-account.component';

const routes: Routes = [
  {
    path: '',
    component: OwnEquityAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OwnEquityAccountRoutingModule { }

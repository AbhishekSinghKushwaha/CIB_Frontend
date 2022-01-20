import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IntercountryFundTransferComponent } from './intercountry-fund-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: IntercountryFundTransferComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntercountryFundTransferRoutingModule { }

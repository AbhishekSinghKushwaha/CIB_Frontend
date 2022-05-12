import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkTransferDetailComponent } from './bulk-transfer-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BulkTransferDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkTransferDetailRoutingModule { }
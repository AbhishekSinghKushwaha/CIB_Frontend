import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkTransferViewComponent } from './bulk-transfer-view.component';

const routes: Routes = [
  {
    path: '',
    component: BulkTransferViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkTransferViewRoutingModule { }

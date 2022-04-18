import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkTransferComponent } from './bulk-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: BulkTransferComponent,
  },
  {
    path: "view/:id",
    loadChildren: (): Promise<any> =>
      import("./bulk-transfer-view/bulk-transfer-view.module").then(
        (m) => m.BulkTransferViewModule
      ),
  },
  {
    path: "details",
    loadChildren: (): Promise<any> =>
      import("./bulk-transfer-detail/bulk-transfer-detail.module").then(
        (m) => m.BulkTransferDetailModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkTransferRoutingModule { }

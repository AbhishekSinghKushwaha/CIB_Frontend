import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingOrdersComponent } from './standing-orders.component';

const routes: Routes = [
  {
    path: '',
    component: StandingOrdersComponent
  },
  {
    path: "detail/:id",
    loadChildren: (): Promise<any> =>
      import("./standing-orders-detail/standing-orders-detail.module").then(
        (m) => m.StandingOrdersDetailModule
      ),
  },
  {
    path: "new",
    loadChildren: (): Promise<any> =>
      import("./standing-orders-form/standing-orders-form.module").then(
        (m) => m.StandingOrdersFormModule
      ),
  },
  {
    path: "edit/:id",
    loadChildren: (): Promise<any> =>
      import("./standing-orders-form/standing-orders-form.module").then(
        (m) => m.StandingOrdersFormModule
      ),
  },
  {
    path: "transfer-submitted/:type",
    loadChildren: () =>
      import("../complete-transfer/complete-transfer.module").then(
        (m) => m.CompleteTransferModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StandingOrdersRoutingModule { }

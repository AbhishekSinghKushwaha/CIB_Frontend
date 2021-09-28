import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactDashboardComponent } from './transact-dashboard/transact-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: TransactDashboardComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteTransferComponent } from './complete-transfer.component';

const routes: Routes = [
  {
    path: '',
    component: CompleteTransferComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteTransferRoutingModule { }

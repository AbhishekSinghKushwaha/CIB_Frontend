import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AirtimeSuccessComponent } from './airtime-success.component';

const routes: Routes = [
  {
    path: '',
    component: AirtimeSuccessComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AirtimeSuccessRoutingModule { }

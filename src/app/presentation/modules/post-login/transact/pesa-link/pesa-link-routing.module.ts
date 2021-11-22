import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PesaLinkComponent } from './pesa-link.component';

const routes: Routes = [
  {
    path: '',
    component: PesaLinkComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PesaLinkRoutingModule { }

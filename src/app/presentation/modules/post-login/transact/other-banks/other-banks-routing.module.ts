import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherBanksComponent } from './other-banks.component';

const routes: Routes = [
  {
    path: '',
    component: OtherBanksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherBanksRoutingModule { }

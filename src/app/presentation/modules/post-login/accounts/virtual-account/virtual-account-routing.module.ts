import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirtualAccountComponent } from './virtual-account.component';

const routes: Routes = [{
  path: '',
  component: VirtualAccountComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirtualAccountRoutingModule { }

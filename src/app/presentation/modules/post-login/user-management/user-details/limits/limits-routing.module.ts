import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LimitsComponent } from './limits.component';

const routes: Routes = [
  {
    path: '',
    component: LimitsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimitsRoutingModule { }

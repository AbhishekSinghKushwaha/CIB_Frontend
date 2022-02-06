import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SwiftComponent } from './swift.component';

const routes: Routes = [
  {
    path: '',
    component: SwiftComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SwiftRoutingModule {}

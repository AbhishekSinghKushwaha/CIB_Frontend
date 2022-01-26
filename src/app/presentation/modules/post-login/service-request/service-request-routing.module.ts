import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequebookRequestComponent } from './chequebook-request/chequebook-request.component';
import { ServiceRequestComponent } from './service-request.component';

const routes: Routes = [{
  path: '',
  component: ServiceRequestComponent
}, {
  path: 'chequebook-request',
  component: ChequebookRequestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }

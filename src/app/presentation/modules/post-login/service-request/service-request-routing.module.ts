import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequebookRequestComponent } from './chequebook-request/chequebook-request.component';
import { EditCompanyLimitComponent } from './edit-company-limit/edit-company-limit.component';
import { EditUserLimitComponent } from './edit-user-limit/edit-user-limit.component';
import { ServiceRequestComponent } from './service-request.component';

const routes: Routes = [{
  path: '',
  component: ServiceRequestComponent
}, {
  path: 'chequebook-request',
  component: ChequebookRequestComponent
}, {
  path: 'user-limit/edit',
  component: EditUserLimitComponent
}, {
  path: 'company-limit/edit',
  component: EditCompanyLimitComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceRequestRoutingModule { }

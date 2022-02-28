import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementSuccessComponent } from './user-management-success.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementSuccessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementSuccessRoutingModule { }

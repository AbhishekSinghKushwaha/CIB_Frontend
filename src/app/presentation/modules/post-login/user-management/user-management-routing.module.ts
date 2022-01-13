import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
  },
  {
    path: 'success',
    loadChildren: (): Promise<any> =>
      import('./user-management-success/user-management-success.module').then(
        (m) => m.UserManagementSuccessModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactRoutingModule { }

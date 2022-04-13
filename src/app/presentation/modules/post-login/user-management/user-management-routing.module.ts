import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('./user-list/user-list.module').then(
        (m) => m.UserListModule
      ),
  }, {
    path: 'add',
    loadChildren: (): Promise<any> =>
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      )
  }, {
    path: 'edit/:username',
    loadChildren: (): Promise<any> =>
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

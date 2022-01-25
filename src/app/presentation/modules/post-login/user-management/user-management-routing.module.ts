import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('./user-management-success/user-management-success.module').then(
        (m) => m.UserManagementSuccessModule
      ),
  },{
    path:'add',
    loadChildren: (): Promise<any> => 
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      )
  },{
    path:'edit/:id',
    loadChildren: (): Promise<any> => 
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      )
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
export class UserManagementRoutingModule { }

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
    path:'add-user',
    loadChildren: (): Promise<any> => 
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      )
  },{
    path:'edit-user',
    loadChildren: (): Promise<any> => 
      import('./user-details/user-details.module').then(
        (m) => m.UserDetailsModule
      )
  },
  {
    path:'add-user-roles',
    data: {
      redirectTo: 'user-management/add-user'
    },
    loadChildren: (): Promise<any> => 
      import('./roles/roles.module').then(
        (m) => m.RolesModule
      )
  },
  {
    path:'edit-user-roles',
    data: {
      redirectTo: 'user-management/edit-user'
    },
    loadChildren: (): Promise<any> => 
      import('./roles/roles.module').then(
        (m) => m.RolesModule
      )
  },
  {
    path:'add-user-limits',
    data: {
      redirectTo: 'user-management/add-user'
    },
    loadChildren: (): Promise<any> => 
      import('./limits/limits.module').then(
        (m) => m.LimitsModule
      )
  },
  {
    path:'edit-user-limits',
    data: {
      redirectTo: 'user-management/edit-user'
    },
    loadChildren: (): Promise<any> => 
      import('./limits/limits.module').then(
        (m) => m.LimitsModule
      )
  },
  {
    path:'products',
    data: {
      redirectTo: 'user-management/edit-user'
    },
    loadChildren: (): Promise<any> => 
      import('./products/products.module').then(
        (m) => m.ProductsModule
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

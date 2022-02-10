import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('./user-list/user-list.module').then(
        (m) => m.UserListModule
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
      ),
      resolve: {
        user: UserResolver
      }
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent
  },
  {
    path:'roles',
    data: {
      redirectTo: 'user-management/add-user'
    },
    loadChildren: (): Promise<any> => 
      import('./roles/roles.module').then(
        (m) => m.RolesModule
      )
  },
  {
    path:'limits',
    data: {
      redirectTo: 'user-management/add-user'
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

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }

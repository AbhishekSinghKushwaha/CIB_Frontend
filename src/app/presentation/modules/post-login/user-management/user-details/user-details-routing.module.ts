import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductOptionsComponent } from './product-options/product-options.component';
import { ProductsComponent } from './products/products.component';
import { RolesComponent } from './roles/roles.component';
import { UserDetailsComponent } from './user-details.component';

const routes: Routes = [
  {
    path: '',
    component: UserDetailsComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'limits',
    data: {
      redirectTo: 'user-management/add-user'
    },
    loadChildren: (): Promise<any> =>
      import('./limits/limits.module').then(
        (m) => m.LimitsModule
      )
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'products/options/:productId',
    component: ProductOptionsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDetailsRoutingModule { }

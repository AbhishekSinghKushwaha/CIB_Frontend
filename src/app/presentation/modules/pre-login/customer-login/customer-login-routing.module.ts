import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLoginComponent } from './customer-login.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerLoginComponent,
    children: [
      {
        path: '',
        loadChildren: (): Promise<any> =>
          import('./login/login.module').then((m) => m.LoginModule),
      }, 
      {
        path: 'forgot-password',
        loadChildren: (): Promise<any> =>
          import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          ),
      },
      {
        path: 'forgot-username',
        loadChildren: (): Promise<any> =>
          import('./forgot-username/forgot-username.module').then(
            (m) => m.ForgotUsernameModule
          ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerLoginRoutingModule { }

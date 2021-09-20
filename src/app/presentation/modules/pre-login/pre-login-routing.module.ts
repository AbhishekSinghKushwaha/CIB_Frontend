import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreLoginComponent } from './pre-login.component';

const routes: Routes = [
  { 
    path: '',
    component: PreLoginComponent,
    children: [
      {
        path: 'forgot-password',
        loadChildren: (): Promise<any> =>
          import('./forgot-password/forgot-password.module').then(
            (m) => m.ForgotPasswordModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreLoginRoutingModule { }

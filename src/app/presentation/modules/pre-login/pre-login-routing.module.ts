import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreLoginComponent } from './pre-login.component';

const routes: Routes = [
  {
    path: '',
    component: PreLoginComponent,
    children: [
      {
        path: 'login',
        loadChildren: (): Promise<any> => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'security-challenge',
        loadChildren: (): Promise<any> => import('./security-challenge/security-challenge.module').then(m => m.SecurityChallengeModule)
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreLoginRoutingModule { }

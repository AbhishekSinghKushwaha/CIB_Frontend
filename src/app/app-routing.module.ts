import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'transact',
    loadChildren: (): Promise<any> => import('./presentation/modules/post-login/post-login.module').then(m => m.PostLoginModule)
  },
  {
    path: '',
    loadChildren: (): Promise<any> => import('./presentation/modules/pre-login/pre-login.module').then(m => m.PreLoginModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  relativeLinkResolution: 'legacy'
}

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

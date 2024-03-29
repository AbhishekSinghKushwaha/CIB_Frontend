import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { PostLoginGuard } from './core/utils/guards/post-login/post-login.guard';
import { PreLoginGuard } from './core/utils/guards/pre-login/pre-login.guard';
import { CustomPreloadingStrategy } from './core/utils/interceptors/custom-preloading-strategy';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> =>
      import('./presentation/modules/post-login/post-login.module').then(
        (m) => m.PostLoginModule
      ),
    canActivate: [PostLoginGuard],
  },
  {
    path: 'auth',
    loadChildren: (): Promise<any> =>
      import('./presentation/modules/pre-login/pre-login.module').then(
        (m) => m.PreLoginModule
      ),
    canActivate: [PreLoginGuard],
    data: { preload: true }
  },
  {
    path: '**',
    redirectTo: '',
  },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
  relativeLinkResolution: 'legacy',
  preloadingStrategy: CustomPreloadingStrategy
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

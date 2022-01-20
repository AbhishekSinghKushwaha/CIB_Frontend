import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './core/utils/guards/login/login.guard';
import { PostLoginGuard } from './core/utils/guards/post-login/post-login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: (): Promise<any> => import('./presentation/modules/post-login/post-login.module').then(m => m.PostLoginModule),
    canActivate: [PostLoginGuard]
  },
  {
    path: 'auth',
    loadChildren: (): Promise<any> => import('./presentation/modules/pre-login/pre-login.module').then(m => m.PreLoginModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'customer-onboarding',
    loadChildren: (): Promise<any> => import('./presentation/modules/customer-onboarding/customer-onboarding.module').then(m => m.CustomerOnboardingModule)
  },
  {
    path: '**',
    redirectTo: '',
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

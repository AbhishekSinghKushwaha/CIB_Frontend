import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: (): Promise<any> =>
      import('./customer-login/customer-login.module').then(
        (m) => m.CustomerLoginModule
      ),
    data: { preload: true, delay: 3000 }
  },
  {
    path: 'customer-onboarding',
    loadChildren: (): Promise<any> =>
      import('./customer-onboarding/customer-onboarding.module').then(
        (m) => m.CustomerOnboardingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PreLoginRoutingModule { }

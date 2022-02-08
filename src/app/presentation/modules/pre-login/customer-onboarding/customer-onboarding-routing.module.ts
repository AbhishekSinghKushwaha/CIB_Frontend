import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onboard',
    pathMatch: 'full',
  },
  {
    path: 'onboard',
    loadChildren: () =>
      import('./onboarding-steps/onboarding-steps.module').then(
        (m) => m.OnboardingStepsModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./registration-steps/registration-steps.module').then(
        (m) => m.RegistrationStepsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerOnboardingRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTypeOptionsComponent } from './account-type-options/account-type-options.component';
import { OnboardingSlidersComponent } from './onboarding-sliders/onboarding-sliders.component';
import { OnboardingStepsComponent } from './onboarding-steps.component';
import { RegistrationStartDetailsComponent } from './registration-start-details/registration-start-details.component';

const routes: Routes = [
  {
    path: '',
    component: OnboardingStepsComponent,
    children: [
      {
        path: '',
        component: OnboardingSlidersComponent,
      },
      {
        path: 'account-type-options',
        component: AccountTypeOptionsComponent,
      },
      {
        path: 'registration-start-details',
        component: RegistrationStartDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingStepsRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnboardingStepsRoutingModule } from './onboarding-steps-routing.module';
import { OnboardingStepsComponent } from './onboarding-steps.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { OnboardingSlidersComponent } from './onboarding-sliders/onboarding-sliders.component';
import { LottieModule } from 'ngx-lottie';
import { MatStyleModule } from 'src/app/mat-style.module';
import { AccountTypeOptionsComponent } from './account-type-options/account-type-options.component';
import { RegistrationStartDetailsComponent } from './registration-start-details/registration-start-details.component';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { CustomerOnboardingService } from 'src/app/core/services/customer-onboarding/customer-onboarding.service';

export function playerFactory(): Promise<any> {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    OnboardingStepsComponent,
    OnboardingSlidersComponent,
    AccountTypeOptionsComponent,
    RegistrationStartDetailsComponent,
  ],
  imports: [
    CommonModule,
    OnboardingStepsRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormElementsModule,
  ],
  providers: [CustomerOnboardingService],
})
export class OnboardingStepsModule {}

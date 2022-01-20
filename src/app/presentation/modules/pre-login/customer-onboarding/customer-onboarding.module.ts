import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOnboardingRoutingModule } from './customer-onboarding-routing.module';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LottieModule } from 'ngx-lottie';
import { CustomerOnboardingService } from './services/customer-onboarding.service';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { CustomerOnboardingRegisterComponent } from './components/customer-onboarding-register/customer-onboarding-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificationPreferencesComponent } from './components/notification-preferences/notification-preferences.component'
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';
import { AddTeamMembersComponent } from './components/notification-preferences/add-team-members/add-team-members.component';

export function playerFactory(): Promise<any> {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    CustomerOnboardingComponent,
    CustomerOnboardingAccountComponent,
    CustomerOnboardingRegisterComponent,
    NotificationPreferencesComponent,
    AddTeamMembersComponent
  ],
  imports: [
    CommonModule,
    CustomerOnboardingRoutingModule,
    MatStyleModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    SharedComponentsModule
  ],
  providers: [CustomerOnboardingService, NotificationConstants],
})
export class CustomerOnboardingModule {}

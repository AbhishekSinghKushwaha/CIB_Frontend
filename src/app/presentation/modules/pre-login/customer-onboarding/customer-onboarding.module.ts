import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOnboardingRoutingModule } from './customer-onboarding-routing.module';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LottieModule } from 'ngx-lottie';
import { CustomerOnboardingService } from './services/customer-onboarding.service';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { TeamMembersRolesComponent } from './components/team-members-roles/team-members-roles.component';
import { TeamMembersDetailsComponent } from './components/team-members-details/team-members-details.component';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { TeamMembersAddComponent } from './components/team-members-add/team-members-add.component';
import { TeamMemberMenuItemComponent } from 'src/app/presentation/shared/components/team-member-menu-item/team-member-menu-item.component';
import { CustomerOnboardingRegisterComponent } from './components/customer-onboarding-register/customer-onboarding-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerOnboardingRegistrationModalComponent } from './components/customer-onboarding-registration-modal/customer-onboarding-registration-modal.component';
import { NotificationPreferencesComponent } from './components/notification-preferences/notification-preferences.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';
import { AddTeamMembersComponent } from './components/notification-preferences/add-team-members/add-team-members.component';
import { CustomerOnboardingRegisterCompanyDetailsComponent } from './components/customer-onboarding-register-company-details/customer-onboarding-register-company-details.component';
import { LayoutModule } from 'src/app/presentation/layout/layout.module';

export function playerFactory(): Promise<any> {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    CustomerOnboardingComponent,
    CustomerOnboardingAccountComponent,
    TeamMembersRolesComponent,
    TeamMembersDetailsComponent,
    TeamMembersAddComponent,
    TeamMemberMenuItemComponent,
    CustomerOnboardingRegisterComponent,
    CustomerOnboardingRegistrationModalComponent,
    NotificationPreferencesComponent,
    AddTeamMembersComponent,
    CustomerOnboardingRegisterCompanyDetailsComponent,
  ],
  imports: [
    CommonModule,
    CustomerOnboardingRoutingModule,
    MatStyleModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormElementsModule,
    LayoutModule,
    SharedComponentsModule,
  ],
  providers: [CustomerOnboardingService, NotificationConstants],
})
export class CustomerOnboardingModule {}

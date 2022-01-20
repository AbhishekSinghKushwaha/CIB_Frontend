import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOnboardingRoutingModule } from './customer-onboarding-routing.module';
import { CompanyDirectorsComponent } from './components/company-directors/company-directors.component';
import { AddCompanyDirectorsComponent } from './components/company-directors/add-company-directors/add-company-directors.component';
import { TeamMembersRolesComponent } from './components/team-members/team-members-roles/team-members-roles.component';
import { TeamMembersDetailsComponent } from './components/team-members/team-members-details/team-members-details.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamMemberMenuItemComponent } from '../../shared/components/team-member-menu-item/team-member-menu-item.component';
import { CustomerOnboardingRegistrationModalComponent } from './components/customer-onboarding-registration-modal/customer-onboarding-registration-modal.component';
import { NotificationPreferencesComponent } from './components/notification-preferences/notification-preferences.component';
import { AddTeamMembersComponent } from './components/notification-preferences/add-team-members/add-team-members.component';
import { CustomerOnboardingRegisterCompanyDetailsComponent } from './components/customer-onboarding-register-company-details/customer-onboarding-register-company-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from '../../shared/modals/confirm-dialog/confirm-dialog.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LottieModule } from 'ngx-lottie';
import { FormElementsModule } from '../../shared/form-elements/form-elements.module';
import { SharedComponentsModule } from '../../shared/components/shared-components.module';
import { CustomerOnboardingService } from './services/customer-onboarding.service';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';
import { LayoutModule } from '../../layout/layout.module';
import { CustomerOnboardingComponent } from './customer-onboarding.component';
import { SharedModalsModule } from '../../shared/modals/shared-modals.module';
import { CompanyDetailsSummaryComponent } from './components/customer-onboarding-register-company-details/company-details-summary/company-details-summary.component';
import { TeamMembersConfirmationModalComponent } from '../../shared/modals/team-members-confirmation-modal/team-members-confirmation-modal.component';

export function playerFactory(): Promise<any> {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    CustomerOnboardingComponent,
    CompanyDirectorsComponent,
    AddCompanyDirectorsComponent,
    TeamMembersRolesComponent,
    TeamMembersDetailsComponent,
    TeamMembersComponent,
    TeamMemberMenuItemComponent,
    CustomerOnboardingRegistrationModalComponent,
    NotificationPreferencesComponent,
    AddTeamMembersComponent,
    CustomerOnboardingRegisterCompanyDetailsComponent,
    CompanyDetailsSummaryComponent,
    TeamMembersConfirmationModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerOnboardingRoutingModule,
    ConfirmDialogModule,
    SharedModalsModule,
    LayoutModule,
    MatStyleModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormElementsModule,
    SharedComponentsModule,
  ],
  providers: [CustomerOnboardingService, NotificationConstants],
})
export class CustomerOnboardingModule { }

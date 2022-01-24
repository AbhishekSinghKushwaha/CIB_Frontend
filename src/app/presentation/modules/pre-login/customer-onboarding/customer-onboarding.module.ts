import { LayoutModule } from 'src/app/presentation/layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOnboardingRoutingModule } from './customer-onboarding-routing.module';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LottieModule } from 'ngx-lottie';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { ConfirmDialogModule } from 'src/app/presentation/shared/modals/confirm-dialog/confirm-dialog.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { CustomerOnboardingRegisterComponent } from './components/customer-onboarding-register/customer-onboarding-register.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterTeamMembersComponent } from './components/register-team-members/register-team-members.component';
import { DeleteTeamMemberModule } from '../../../shared/components/delete-team-member/delete-team-member.module';
import { RegistrationConfirmationComponent } from '../../customer-onboarding/components/registration-confirmation/registration-confirmation.component';

export function playerFactory(): Promise<any> {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    CustomerOnboardingComponent,
    CustomerOnboardingAccountComponent,
    CustomerOnboardingRegisterComponent,
    RegisterTeamMembersComponent,
    RegistrationConfirmationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerOnboardingRoutingModule,
    ConfirmDialogModule,
    LayoutModule,
    MatStyleModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormElementsModule,
    LayoutModule,
    SharedComponentsModule,
    DeleteTeamMemberModule
  ],
  providers: [],
})
export class CustomerOnboardingModule { }

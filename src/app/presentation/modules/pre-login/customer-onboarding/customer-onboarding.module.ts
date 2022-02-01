import { LayoutModule } from 'src/app/presentation/layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOnboardingRoutingModule } from './customer-onboarding-routing.module';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LottieModule } from 'ngx-lottie';
import { ConfirmDialogModule } from 'src/app/presentation/shared/modals/confirm-dialog/confirm-dialog.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteTeamMemberModule } from '../../../shared/components/delete-team-member/delete-team-member.module';

export function playerFactory(): Promise<any> {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [],
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
    DeleteTeamMemberModule,
  ],
  providers: [],
})
export class CustomerOnboardingModule {}

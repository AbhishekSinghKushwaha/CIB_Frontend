import { LayoutModule } from 'src/app/presentation/layout/layout.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerOnboardingRoutingModule } from './customer-onboarding-routing.module';
import { CustomerOnboardingComponent } from './components/customer-onboarding/customer-onboarding.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { LottieModule } from 'ngx-lottie';
import { CustomerOnboardingService } from './services/customer-onboarding.service';
import { CustomerOnboardingAccountComponent } from './components/customer-onboarding-account/customer-onboarding-account.component';
import { CompanyDirectorsComponent } from './components/company-directors/company-directors.component';
import { AddCompanyDirectorsComponent } from './components/company-directors/add-company-directors/add-company-directors.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'src/app/presentation/shared/modals/confirm-dialog/confirm-dialog.module';
import { CustomerOnboardingShellComponent } from './customer-onboarding-shell/customer-onboarding-shell.component';

export function playerFactory(): Promise<any> {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    CustomerOnboardingComponent,
    CustomerOnboardingAccountComponent,
    CompanyDirectorsComponent,
    AddCompanyDirectorsComponent,
    CustomerOnboardingShellComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CustomerOnboardingRoutingModule,
    ConfirmDialogModule,
    LayoutModule,
    MatStyleModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [CustomerOnboardingService],
})
export class CustomerOnboardingModule { }

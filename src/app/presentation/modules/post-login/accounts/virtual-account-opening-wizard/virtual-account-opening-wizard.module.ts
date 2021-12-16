import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualAccountOpeningWizardRoutingModule } from './virtual-account-opening-wizard-routing.module';
import { VirtualAccountOpeningWizardComponent } from './virtual-account-opening-wizard.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { VirtualAccountFormComponent } from './virtual-account-form/virtual-account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VirtualAccountVerificationMediumComponent } from './virtual-account-verification-medium/virtual-account-verification-medium.component';
import { VirtualAccountEmailVerificationComponent } from './virtual-account-email-verification/virtual-account-email-verification.component';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { VirtualAccountSmsVerificationComponent } from './virtual-account-sms-verification/virtual-account-sms-verification.component';
import { VirtualAccountSubmissionComponent } from './virtual-account-submission/virtual-account-submission.component';

@NgModule({
  declarations: [
    VirtualAccountOpeningWizardComponent,
    VirtualAccountFormComponent,
    VirtualAccountVerificationMediumComponent,
    VirtualAccountEmailVerificationComponent,
    VirtualAccountSmsVerificationComponent,
    VirtualAccountSubmissionComponent
  ],
  imports: [
    CommonModule,
    VirtualAccountOpeningWizardRoutingModule,
    MatStyleModule,
    SharedComponentsModule,
    ReactiveFormsModule
  ]
})
export class VirtualAccountOpeningWizardModule { }

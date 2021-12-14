import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualAccountOpeningWizardRoutingModule } from './virtual-account-opening-wizard-routing.module';
import { VirtualAccountOpeningWizardComponent } from './virtual-account-opening-wizard.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { VirtualAccountFormComponent } from './virtual-account-form/virtual-account-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VirtualAccountVerificationMediumComponent } from './virtual-account-verification-medium/virtual-account-verification-medium.component';
import { VirtualAccountEmailVerificationComponent } from './virtual-account-email-verification/virtual-account-email-verification.component';

@NgModule({
  declarations: [
    VirtualAccountOpeningWizardComponent,
    VirtualAccountFormComponent,
    VirtualAccountVerificationMediumComponent,
    VirtualAccountEmailVerificationComponent
  ],
  imports: [
    CommonModule,
    VirtualAccountOpeningWizardRoutingModule,
    MatStyleModule,
    ReactiveFormsModule
  ]
})
export class VirtualAccountOpeningWizardModule { }

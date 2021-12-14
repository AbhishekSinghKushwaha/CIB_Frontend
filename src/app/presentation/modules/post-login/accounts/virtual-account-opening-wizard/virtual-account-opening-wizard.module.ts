import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirtualAccountOpeningWizardRoutingModule } from './virtual-account-opening-wizard-routing.module';
import { VirtualAccountOpeningWizardComponent } from './virtual-account-opening-wizard.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { VirtualAccountFormComponent } from './virtual-account-form/virtual-account-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    VirtualAccountOpeningWizardComponent,
    VirtualAccountFormComponent
  ],
  imports: [
    CommonModule,
    VirtualAccountOpeningWizardRoutingModule,
    MatStyleModule,
    ReactiveFormsModule
  ]
})
export class VirtualAccountOpeningWizardModule { }

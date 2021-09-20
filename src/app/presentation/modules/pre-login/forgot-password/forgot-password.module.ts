import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ValidateCredentialsComponent } from './components/validate-credentials/validate-credentials.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ValidateCredentialsComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    MatStyleModule,
  ],
})
export class ForgotPasswordModule {}

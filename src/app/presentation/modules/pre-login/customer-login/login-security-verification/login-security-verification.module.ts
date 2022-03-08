import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSecurityVerificationRoutingModule } from './login-security-verification-routing.module';
import { LoginSecurityVerificationComponent } from './login-security-verification.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';

@NgModule({
  declarations: [LoginSecurityVerificationComponent],
  imports: [
    CommonModule,
    LoginSecurityVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    SharedComponentsModule
  ],
})
export class LoginSecurityVerificationModule { }

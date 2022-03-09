import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginSecurityChallengeRoutingModule } from './login-security-challenge-routing.module';
import { LoginSecurityChallengeComponent } from './login-security-challenge.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';

@NgModule({
  declarations: [LoginSecurityChallengeComponent],
  imports: [
    CommonModule,
    LoginSecurityChallengeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
    SharedComponentsModule
  ],
})
export class LoginSecurityChallengeModule { }

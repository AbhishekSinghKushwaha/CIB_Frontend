import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OtpVerificationConfirmationComponent } from './otp-verification-confirmation.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormElementsModule } from '../../form-elements/form-elements.module';
import { MatIconModule } from '@angular/material/icon';
import { SharedComponentsModule } from '../../components/shared-components.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    OtpVerificationConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    
  ],
})
export class OtpVerificationConfirmationModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityVerificationRoutingModule } from './security-verification-routing.module';
import { SecurityVerificationComponent } from './security-verification.component';
import { MatStyleModule } from 'src/app/mat-style.module';

@NgModule({
  declarations: [SecurityVerificationComponent],
  imports: [
    CommonModule,
    SecurityVerificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
  ],
})
export class SecurityVerificationModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SecurityChallengeRoutingModule } from './security-challenge-routing.module';
import { SecurityChallengeComponent } from './security-challenge.component';
import { MatStyleModule } from './../../../../mat-style.module';


@NgModule({
  declarations: [
    SecurityChallengeComponent
  ],
  imports: [
    CommonModule,
    SecurityChallengeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatStyleModule,
  ]
})
export class SecurityChallengeModule { }

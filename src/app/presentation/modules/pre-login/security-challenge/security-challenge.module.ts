import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecurityChallengeRoutingModule } from './security-challenge-routing.module';
import { SecurityChallengeComponent } from './security-challenge.component';


@NgModule({
  declarations: [
    SecurityChallengeComponent
  ],
  imports: [
    CommonModule,
    SecurityChallengeRoutingModule
  ]
})
export class SecurityChallengeModule { }

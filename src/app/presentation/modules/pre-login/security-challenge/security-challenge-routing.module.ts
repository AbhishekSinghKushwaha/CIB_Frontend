import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecurityChallengeComponent } from './security-challenge.component';

const routes: Routes = [{
    path: '',
    component: SecurityChallengeComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityChallengeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeamMembersComponent } from './add-team-members.component';

const routes: Routes = [
  {
    path: '',
    component: AddTeamMembersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddTeamMembersRoutingModule { }

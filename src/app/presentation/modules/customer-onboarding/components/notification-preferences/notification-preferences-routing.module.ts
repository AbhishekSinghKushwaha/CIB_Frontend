import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationPreferencesComponent } from './notification-preferences.component';
import { AddTeamMembersComponent } from './add-team-members/add-team-members.component';

const routes: Routes = [
  {
    path: '',
    component: NotificationPreferencesComponent
  },
  {
    path: 'add-members',
    component: AddTeamMembersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationPreferencesRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddTeamMembersRoutingModule } from './add-team-members-routing.module';
import { AddTeamMembersComponent } from './add-team-members.component';
import { MatStyleModule } from 'src/app/mat-style.module';


@NgModule({
  declarations: [
    AddTeamMembersComponent
  ],
  imports: [
    CommonModule,
    AddTeamMembersRoutingModule,
    MatStyleModule
  ]
})
export class AddTeamMembersModule { }

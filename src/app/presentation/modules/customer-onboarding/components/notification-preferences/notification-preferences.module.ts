import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationPreferencesRoutingModule } from './notification-preferences-routing.module';
import { NotificationPreferencesComponent } from './notification-preferences.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { NotificationConstants } from 'src/app/core/utils/constants/notification-menu.constants';
import { AddTeamMembersComponent } from './add-team-members/add-team-members.component';

@NgModule({
  declarations: [
    NotificationPreferencesComponent,
    AddTeamMembersComponent
  ],
  imports: [
    CommonModule,
    NotificationPreferencesRoutingModule,
    MatStyleModule,
    SharedComponentsModule
    ],
  providers: [
    NotificationConstants
  ]
})
export class NotificationPreferencesModule { }

import { SharedModalsModule } from 'src/app/presentation/shared/modals/shared-modals.module';
import { FormElementsModule } from 'src/app/presentation/shared/form-elements/form-elements.module';
import { MatStyleModule } from './../../../../../mat-style.module';
import { SharedComponentsModule } from 'src/app/presentation/shared/components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationPreferenceComponent } from './notification-preference.component';
import { NotificationPreferenceRoutingModule } from './notification-preference-routing.module';
import { SetupNotificationComponent } from './setup-notification/setup-notification.component';



@NgModule({
  declarations: [
    NotificationPreferenceComponent,
    SetupNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationPreferenceRoutingModule,
    SharedComponentsModule,
    MatStyleModule,
    FormElementsModule,
    SharedModalsModule
  ]
})
export class NotificationPreferenceModule { }

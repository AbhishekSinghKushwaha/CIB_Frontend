import { SetupNotificationComponent } from './setup-notification/setup-notification.component';
import { NotificationPreferenceComponent } from './notification-preference.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: NotificationPreferenceComponent
    },
    {
        path: 'setup-notification',
        component: SetupNotificationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotificationPreferenceRoutingModule { }

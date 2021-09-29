import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from './notification-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NotificationModalService } from '../../../../core/services/notification-modal/notification-modal.service';
import { SharedComponentsModule } from '../../components/shared-components.module';

@NgModule({
  declarations: [
    NotificationModalComponent,
  ],
  imports: [
    CommonModule,
    MatStyleModule,
    SharedComponentsModule
  ],
  exports:[
    NotificationModalComponent
  ],
  providers:[
    NotificationModalService
  ]
})
export class NotificationModalModule { }

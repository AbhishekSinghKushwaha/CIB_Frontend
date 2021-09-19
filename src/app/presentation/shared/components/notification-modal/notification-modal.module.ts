import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from './notification-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { NotificationModalService } from '../../../../core/services/notification-modal/notification-modal.service';

@NgModule({
  declarations: [
    NotificationModalComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  exports:[
    NotificationModalComponent
  ],
  providers:[
    NotificationModalService
  ]
})
export class NotificationModalModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModalComponent } from './notification-modal.component';
import { MatStyleModule } from 'src/app/mat-style.module';



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
  ]
})
export class NotificationModalModule { }

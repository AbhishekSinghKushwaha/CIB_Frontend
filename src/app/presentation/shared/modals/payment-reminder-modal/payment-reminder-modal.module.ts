import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentReminderModalComponent } from './payment-reminder-modal.component';
import { PaymentReminderService } from 'src/app/core/services/payment-reminder/payment-reminder.service';
import { PaymentReminderListItemsComponent } from './payment-reminder-list-items/payment-reminder-list-items.component';
import { MatStyleModule } from './../../../../mat-style.module';



@NgModule({
  declarations: [
    PaymentReminderModalComponent,
    PaymentReminderListItemsComponent,
  ],
  exports:[
    PaymentReminderListItemsComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule
  ],
  providers:[
    PaymentReminderService
  ]
})
export class PaymentReminderModalModule { }

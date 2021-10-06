import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedulePaymentComponent } from './schedule-payment.component';
import { MatStyleModule } from 'src/app/mat-style.module';
import { OwnequityModalService } from '../../../../core/services/ownequity-modal/ownequity-modal.service';



@NgModule({
  declarations: [
    SchedulePaymentComponent
  ],
  imports: [
    CommonModule,
    MatStyleModule,
  ],
  exports:[
    SchedulePaymentComponent
  ],
  providers:[
    OwnequityModalService
  ]
})
export class SchedulePaymentModule { }

import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ScheduledPaymentModel } from '../../domain/scheduled-payment.model';
import { SchedulePaymentComponent } from 'src/app/presentation/shared/modals/schedule-payment/schedule-payment.component';

@Injectable()
export class ScheduledPaymentService {
  data = new Subject<any>();

  constructor(private readonly dialog: MatDialog) { }

  open(data: ScheduledPaymentModel): void {
    this.dialog.open<SchedulePaymentComponent, ScheduledPaymentModel>(SchedulePaymentComponent, {
      disableClose: true,
      data
    });
  }

  set(input: ScheduledPaymentModel): void {
    this.data.next(input)
  }
}

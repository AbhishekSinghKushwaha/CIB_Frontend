import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { SchedulePaymentComponent } from '../../../presentation/shared/modals/schedule-payment/schedule-payment.component';
import { FrequencySelectionModal } from '../../domain/schedule-payment-frequency.model';
import { ReminderSelectionModal } from '../../domain/schedule-payment-reminder.model';

@Injectable({
  providedIn: 'root'
})
export class SchedulePaymentService {

  frequencySelection = new Subject<FrequencySelectionModal>();
  ReminderSelection = new Subject<ReminderSelectionModal>();

  constructor(private readonly dialog: MatDialog) { }

  openSchedulePayment(): void {
    this.dialog.open<SchedulePaymentComponent>(SchedulePaymentComponent, {
      disableClose: true,
    });
  }

  selectFrequency(frequency: FrequencySelectionModal): void {
    this.frequencySelection.next(frequency)
  }

  selectReminder(reminder: ReminderSelectionModal): void {
    this.ReminderSelection.next(reminder)
  }

}

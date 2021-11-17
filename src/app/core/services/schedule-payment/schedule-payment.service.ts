import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { PaymentFrequencyModalComponent } from 'src/app/presentation/shared/modals/payment-frequency-modal/payment-frequency-modal.component';
import { PaymentReminderModalComponent } from 'src/app/presentation/shared/modals/payment-reminder-modal/payment-reminder-modal.component';
import { FrequencySelectionComponent } from 'src/app/presentation/shared/modals/schedule-payment/frequency-selection/frequency-selection.component';
import { ReminderSelectionComponent } from 'src/app/presentation/shared/modals/schedule-payment/reminder-selection/reminder-selection.component';
import { SchedulePaymentComponent } from '../../../presentation/shared/modals/schedule-payment/schedule-payment.component';
import {
  FrequencySelectionModel,
  ReminderSelectionModel,
  ScheduledPaymentModel,
} from '../../domain/scheduled-payment.model';

@Injectable({
  providedIn: 'root',
})
export class SchedulePaymentService {
  private schedulePaymentData: ScheduledPaymentModel;
  reminderData: ReminderSelectionModel;
  frequencyData: FrequencySelectionModel;
  dialogRef: any;
  selectedSchedulePayment = new Subject<ScheduledPaymentModel>();
  selectedFrequency = new Subject<FrequencySelectionModel>();
  selectedReminder = new Subject<ReminderSelectionModel>();

  constructor(private readonly dialog: MatDialog) {}

  // Open the schedule payment modal
  openSchedulePaymentModal(data: ScheduledPaymentModel): void {
    this.dialogRef = this.dialog.open<
      SchedulePaymentComponent,
      ScheduledPaymentModel
    >(SchedulePaymentComponent, {
      disableClose: true,
      data,
    });
  }

  // Open the frequency selection modal
  openFrequencySelectionModal(data: FrequencySelectionModel[]): void {
    this.dialog.open<PaymentFrequencyModalComponent, FrequencySelectionModel[]>(
      PaymentFrequencyModalComponent,
      {
        disableClose: false,
        data,
      }
    );
  }

  // Open the set reminder modal
  openReminderSelectionModal(data: ReminderSelectionModel[]): void {
    this.dialog.open<PaymentReminderModalComponent, ReminderSelectionModel[]>(
      PaymentReminderModalComponent,
      {
        disableClose: false,
        data,
      }
    );
  }

  selectFrequency(frequency: FrequencySelectionModel): void {
    this.selectedFrequency.next(frequency);
  }

  selectReminder(reminder: ReminderSelectionModel): void {
    this.selectedReminder.next(reminder);
  }

  selectScheduledPayment(input: ScheduledPaymentModel): void {
    this.schedulePaymentData = input;
    this.selectedSchedulePayment.next(this.schedulePaymentData);
  }

  get defaultSchedulePayment(): ScheduledPaymentModel {
    return this.schedulePaymentData;
  }

  get defaultReminder(): ReminderSelectionModel {
    return this.reminderData;
  }

  get defaultFrequency(): FrequencySelectionModel {
    return this.frequencyData;
  }

  close() {
    this.dialogRef.close();
  }
}

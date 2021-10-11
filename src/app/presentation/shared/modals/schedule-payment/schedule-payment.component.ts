import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentFrequencyModel } from 'src/app/core/domain/payment-frequency.model';
import { PaymentreminderModel } from 'src/app/core/domain/payment-reminder.model';
import { PaymentFrequencyService } from 'src/app/core/services/payment-frequency/payment-frequency.service';
import { PaymentReminderService } from 'src/app/core/services/payment-reminder/payment-reminder.service';

@Component({
  selector: 'app-schedule-payment',
  templateUrl: './schedule-payment.component.html',
  styleUrls: ['./schedule-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulePaymentComponent implements OnInit {
  frequency: PaymentFrequencyModel;
  reminder: PaymentreminderModel;
  mockFrequency: PaymentFrequencyModel[] = [{
    text: 'Once-off',
    subText: 'Description',
  }, {
    text: 'Daily',
    subText: 'Description',
  }, {
    text: 'Weekly',
    subText: 'Description',
  }, {
    text: 'Monthly',
    subText: 'Description',
  }];
  reminders: PaymentreminderModel[] = [
    { id: 1, text: '1 day before' },
    { id: 2, text: '2 days before' },
    { id: 3, text: '3 days before' },
    { id: 4, text: '4 days before' }
  ]

  constructor(
    private readonly dialogRef: MatDialogRef<SchedulePaymentComponent>,
    private readonly paymentFrequencyService: PaymentFrequencyService,
    private readonly paymentReminderService: PaymentReminderService
  ) { }

  ngOnInit(): void {
    this.paymentFrequencyService.selected.subscribe(x => this.frequency = x);
    this.paymentReminderService.selected.subscribe(x => this.reminder = x);
  }

  close(): void {
    this.dialogRef.close(true);
  }

  openFrequency(): void {
    this.paymentFrequencyService.open(this.mockFrequency);
  }

  openReminder(): void {
    this.paymentReminderService.open(this.reminders);
  }
}

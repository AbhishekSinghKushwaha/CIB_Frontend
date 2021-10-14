import { Component, Input, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { PaymentFrequencyModel } from 'src/app/core/domain/payment-frequency.model';
import { PaymentreminderModel } from 'src/app/core/domain/payment-reminder.model';
import { PaymentFrequencyService } from 'src/app/core/services/payment-frequency/payment-frequency.service';
import { PaymentReminderService } from 'src/app/core/services/payment-reminder/payment-reminder.service';
import { ScheduledPaymentService } from 'src/app/core/services/scheduled-payment/scheduled-payment.service';
import { ScheduledPaymentModel } from 'src/app/core/domain/scheduled-payment.model';

@Component({
  selector: 'app-schedule-payment',
  templateUrl: './schedule-payment.component.html',
  styleUrls: ['./schedule-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulePaymentComponent implements OnInit {
  equityForm: FormGroup;
  frequency: PaymentFrequencyModel;
  reminder: PaymentreminderModel;
  data: ScheduledPaymentModel;
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
    private readonly paymentReminderService: PaymentReminderService,
    private readonly scheduledPaymentService: ScheduledPaymentService
  ) {

    this.data = scheduledPaymentService.default;
    this.eventsSubscriptions();
  }

  ngOnInit(): void {
    this.initForm();

  }

  initForm() {
    this.equityForm = new FormGroup({
      frequency: new FormControl(this.data?.frequency, [Validators.required]),
      startDate: new FormControl(this.data?.startDate, [Validators.required]),
      endDate: new FormControl(this.data?.endDate, [Validators.required]),
      reminder: new FormControl(this.data?.reminder, [Validators.required]),
    });
  }

  private eventsSubscriptions(): void {
    this.paymentFrequencyService.selected.subscribe(response => this.equityForm.controls.frequency.setValue(response.text));
    this.paymentReminderService.selected.subscribe(response => this.equityForm.controls.reminder.setValue(response.text));
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

  submit() {
    this.scheduledPaymentService.set(this.equityForm.value);
    this.scheduledPaymentService.close();
  }
}

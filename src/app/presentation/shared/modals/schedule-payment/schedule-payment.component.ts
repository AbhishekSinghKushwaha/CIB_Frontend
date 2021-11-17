import {
  Component,
  Input,
  Inject,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {
  FrequencySelectionModel,
  ReminderSelectionModel,
  ScheduledPaymentModel,
} from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentConstants } from 'src/app/core/utils/constants/schedule-payment.constants';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-schedule-payment',
  templateUrl: './schedule-payment.component.html',
  styleUrls: ['./schedule-payment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SchedulePaymentComponent implements OnInit {
  paymentScheduleForm: FormGroup;
  reminder: ReminderSelectionModel;
  frequency: FrequencySelectionModel;
  scheduledPayment: ScheduledPaymentModel;

  constructor(
    public readonly frequencies: SchedulePaymentConstants,
    private readonly dialogRef: MatDialogRef<SchedulePaymentComponent>,
    private readonly schedulePaymentService: SchedulePaymentService // private readonly scheduledPaymentService: ScheduledPaymentService
  ) {
    // this.data = schedulePaymentService.default;
    this.eventsSubscriptions();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.paymentScheduleForm = new FormGroup({
      frequency: new FormControl(this.scheduledPayment?.frequency, [
        Validators.required,
      ]),
      startDate: new FormControl(this.scheduledPayment?.startDate, [
        Validators.required,
      ]),
      endDate: new FormControl(this.scheduledPayment?.endDate, [
        Validators.required,
      ]),
      reminder: new FormControl(this.scheduledPayment?.reminderDay, [
        Validators.required,
      ]),
    });
  }

  private eventsSubscriptions(): void {
    this.schedulePaymentService.selectedFrequency.subscribe((response) => {
      this.frequency = response;
      this.paymentScheduleForm.controls.frequency.setValue(response.frequency);
    });
    this.schedulePaymentService.selectedReminder.subscribe((response) => {
      this.reminder = response;
      this.paymentScheduleForm.controls.reminder.setValue(response.reminder);
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  // Open Frequency Modal
  openFrequencyModal(): void {
    this.schedulePaymentService.openFrequencySelectionModal(
      this.frequencies.FREQUENCY_LISTINGS
    );
  }

  // Open Reminder Modal
  openReminderModal(): void {
    this.schedulePaymentService.openReminderSelectionModal(
      this.frequencies.REMINDER_LISTINGS
    );
  }

  // Set the scheduled payment
  submit() {
    const scheduledPaymentData: ScheduledPaymentModel = {
      frequency: this.frequency.value,
      reminderDay: this.reminder.value,
      startDate:
        this.paymentScheduleForm.controls.startDate.value.toISOString(),
      endDate: this.paymentScheduleForm.controls.endDate.value.toISOString(),
    };
    this.schedulePaymentService.selectScheduledPayment(scheduledPaymentData);
    this.schedulePaymentService.close();
  }
}

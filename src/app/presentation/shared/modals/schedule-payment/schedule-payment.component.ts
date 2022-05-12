import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import {
  FrequencySelectionModel,
  ReminderSelectionModel,
  ScheduledPaymentModel,
} from "src/app/core/domain/scheduled-payment.model";
import { SchedulePaymentConstants } from "src/app/core/utils/constants/schedule-payment.constants";
import { SchedulePaymentService } from "src/app/core/services/schedule-payment/schedule-payment.service";
import moment from "moment";

@Component({
  selector: "app-schedule-payment",
  templateUrl: "./schedule-payment.component.html",
  styleUrls: ["./schedule-payment.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SchedulePaymentComponent implements OnInit {
  paymentScheduleForm: FormGroup;
  reminder: ReminderSelectionModel;
  frequency: FrequencySelectionModel;
  scheduledPayment: ScheduledPaymentModel;
  minDate = new Date();
  constructor(
    public readonly schedulePaymentConstants: SchedulePaymentConstants,
    private readonly dialogRef: MatDialogRef<SchedulePaymentComponent>,
    private readonly schedulePaymentService: SchedulePaymentService // private readonly scheduledPaymentService: ScheduledPaymentService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.eventsSubscriptions();
  }

  initForm() {
    this.paymentScheduleForm = new FormGroup({
      frequency: new FormControl("", [Validators.required]),
      startDate: new FormControl(this.minDate, [Validators.required]),
      endDate: new FormControl(this.minDate, [Validators.required]),
      reminder: new FormControl("", [Validators.required]),
    });
  }

  private eventsSubscriptions(): void {
    this.schedulePaymentService.frequency$.subscribe((response) => {
      this.frequency = response;
      this.paymentScheduleForm.controls.frequency.setValue(response.frequency);
    });
    this.schedulePaymentService.reminder$.subscribe((response) => {
      this.reminder = response;
      console.log(response);
      this.paymentScheduleForm.controls.reminder.setValue(response.reminder);
    });
  }

  close(): void {
    this.dialogRef.close(true);
  }

  // Open Frequency Modal
  openFrequencyModal(): void {
    this.schedulePaymentService.openFrequencySelectionModal(
      this.schedulePaymentConstants.FREQUENCY_LISTINGS
    );
  }

  // Open Reminder Modal
  openReminderModal(): void {
    this.schedulePaymentService.openReminderSelectionModal(
      this.schedulePaymentConstants.REMINDER_LISTINGS
    );
  }

  // Set the scheduled payment
  submit() {
    const scheduledPaymentData: ScheduledPaymentModel = {
      frequency:
        this.frequency === undefined
          ? this.scheduledPayment.frequency
          : this.frequency,
      reminderDay:
        this.frequency === undefined
          ? this.scheduledPayment.reminderDay
          : this.reminder,
      startDate: this.paymentScheduleForm.controls.startDate.value,
      endDate: this.paymentScheduleForm.controls.endDate.value,
    };
    this.schedulePaymentService.setScheduledPayment(scheduledPaymentData);
    this.schedulePaymentService.close();
  }
}

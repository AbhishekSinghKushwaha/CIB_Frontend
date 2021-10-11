import { Component, Input, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FrequencySelectionConstants } from '../../../../core/utils/constants/schedule-payment-frequency.constants';
import { ReminderSelectionConstants } from '../../../../core/utils/constants/Schedule-payment-reminder.constants'
import { FrequencySelectionModal } from 'src/app/core/domain/schedule-payment-frequency.model';
import { ReminderSelectionModal } from 'src/app/core/domain/schedule-payment-reminder.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-schedule-payment',
  templateUrl: './schedule-payment.component.html',
  styleUrls: ['./schedule-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulePaymentComponent implements OnInit {
  selected: FrequencySelectionModal;
  selectedReminder: ReminderSelectionModal;

  constructor(
    readonly dialogRef: MatDialogRef<SchedulePaymentComponent>,
    public readonly frequencySelectionList: FrequencySelectionConstants,
    public readonly reminderSelectionList: ReminderSelectionConstants,
    private readonly schedulePaymentService: SchedulePaymentService,
  ) { }

  ngOnInit(): void {
    this.schedulePaymentService.frequencySelection.subscribe((x) => this.selected = x);
    this.schedulePaymentService.ReminderSelection.subscribe((x) => this.selectedReminder = x);
  }

  close(): void {
    this.dialogRef.close(true);
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReminderSelectionModel } from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-payment-reminder-modal',
  templateUrl: './payment-reminder-modal.component.html',
  styleUrls: ['./payment-reminder-modal.component.scss'],
})
export class PaymentReminderModalComponent implements OnInit {
  selected: ReminderSelectionModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ReminderSelectionModel[],
    private readonly schedulePaymentService: SchedulePaymentService
  ) {
    this.selected = schedulePaymentService.defaultReminder;
    this.schedulePaymentService.selectedReminder.subscribe(
      (response) => (this.selected = response)
    );
  }

  ngOnInit(): void {}
}

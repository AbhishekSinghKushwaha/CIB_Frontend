import { Component, OnInit, Input } from '@angular/core';
import { ReminderSelectionModel } from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-payment-reminder-list-items',
  templateUrl: './payment-reminder-list-items.component.html',
  styleUrls: ['./payment-reminder-list-items.component.scss'],
})
export class PaymentReminderListItemsComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: ReminderSelectionModel;
  constructor(
    private readonly schedulePaymentService: SchedulePaymentService
  ) {}

  ngOnInit(): void {}

  select(): void {
    this.schedulePaymentService.selectReminder(this.data);
  }
}

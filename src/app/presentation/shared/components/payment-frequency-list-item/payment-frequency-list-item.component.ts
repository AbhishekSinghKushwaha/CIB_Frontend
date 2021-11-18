import { Component, Input, OnInit } from '@angular/core';
import {
  FrequencySelectionModel,
  ReminderSelectionModel,
} from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-payment-frequency-list-item',
  templateUrl: './payment-frequency-list-item.component.html',
  styleUrls: ['./payment-frequency-list-item.component.scss'],
})
export class PaymentFrequencyListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: FrequencySelectionModel;
  constructor(
    private readonly schedulePaymentService: SchedulePaymentService
  ) {}

  ngOnInit(): void {}

  select(): void {
    this.schedulePaymentService.selectFrequency(this.data);
  }
}

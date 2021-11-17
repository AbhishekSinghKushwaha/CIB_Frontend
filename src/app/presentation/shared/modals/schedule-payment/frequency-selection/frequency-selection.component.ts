import { Component, Input, OnInit } from '@angular/core';
import { FrequencySelectionModel } from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-frequency-selection',
  templateUrl: './frequency-selection.component.html',
  styleUrls: ['./frequency-selection.component.scss'],
})
export class FrequencySelectionComponent implements OnInit {
  @Input() data: any;
  @Input() isChecked: boolean;

  constructor(
    private readonly schedulePaymentService: SchedulePaymentService
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  select(): void {
    this.schedulePaymentService.selectedFrequency.next(this.data);
  }
}

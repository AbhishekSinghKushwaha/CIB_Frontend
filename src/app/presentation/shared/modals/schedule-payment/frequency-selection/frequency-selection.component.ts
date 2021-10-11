import { Component, Input, OnInit } from '@angular/core';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-frequency-selection',
  templateUrl: './frequency-selection.component.html',
  styleUrls: ['./frequency-selection.component.scss']
})
export class FrequencySelectionComponent implements OnInit {

  @Input() data:any;
  @Input() isChecked: boolean;

  constructor(
    private readonly schedulePaymentService: SchedulePaymentService,
  ) { }

  ngOnInit(): void {
  }

  select(): void {
    this.schedulePaymentService.frequencySelection.next(this.data);
  }

}

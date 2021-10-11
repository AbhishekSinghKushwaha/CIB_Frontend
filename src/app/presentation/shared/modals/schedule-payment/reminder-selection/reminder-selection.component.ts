import { Component, Input, OnInit } from '@angular/core';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-reminder-selection',
  templateUrl: './reminder-selection.component.html',
  styleUrls: ['./reminder-selection.component.scss']
})
export class ReminderSelectionComponent implements OnInit {

  @Input() data:any;
  @Input() isChecked: boolean;

  constructor(
    private readonly schedulePaymentService: SchedulePaymentService,
  ) { }

  ngOnInit(): void {
  }

  selectReminder(): void {
    this.schedulePaymentService.ReminderSelection.next(this.data);
  }

}

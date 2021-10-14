import { Component, OnInit, Input } from '@angular/core';
import { PaymentreminderModel } from 'src/app/core/domain/payment-reminder.model';
import { PaymentReminderService } from 'src/app/core/services/payment-reminder/payment-reminder.service';

@Component({
  selector: 'app-payment-reminder-list-items',
  templateUrl: './payment-reminder-list-items.component.html',
  styleUrls: ['./payment-reminder-list-items.component.scss']
})
export class PaymentReminderListItemsComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: PaymentreminderModel;
  constructor(private readonly paymentReminderService: PaymentReminderService) { }

  ngOnInit(): void {
  }

  select(): void {
    this.paymentReminderService.select(this.data);
  }
}

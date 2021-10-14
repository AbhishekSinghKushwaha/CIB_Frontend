import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentreminderModel } from 'src/app/core/domain/payment-reminder.model';
import { PaymentReminderService } from 'src/app/core/services/payment-reminder/payment-reminder.service';

@Component({
  selector: 'app-payment-reminder-modal',
  templateUrl: './payment-reminder-modal.component.html',
  styleUrls: ['./payment-reminder-modal.component.scss']
})
export class PaymentReminderModalComponent implements OnInit {
  selected: PaymentreminderModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PaymentreminderModel[],
    private readonly paymentReminderService: PaymentReminderService) {
    this.selected = paymentReminderService.default;
    this.paymentReminderService.selected.subscribe(response => this.selected = response);
  }

  ngOnInit(): void {
  }

}

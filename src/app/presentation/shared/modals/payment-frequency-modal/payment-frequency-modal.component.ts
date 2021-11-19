import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FrequencySelectionModel } from 'src/app/core/domain/scheduled-payment.model';
import { SchedulePaymentService } from 'src/app/core/services/schedule-payment/schedule-payment.service';

@Component({
  selector: 'app-payment-frequency-modal',
  templateUrl: './payment-frequency-modal.component.html',
  styleUrls: ['./payment-frequency-modal.component.scss'],
})
export class PaymentFrequencyModalComponent implements OnInit {
  selected: FrequencySelectionModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: FrequencySelectionModel[],
    private readonly schedulePaymentService: SchedulePaymentService
  ) {
    this.selected = schedulePaymentService.defaultFrequency;
    this.schedulePaymentService.selectedFrequency.subscribe(
      (x) => (this.selected = x)
    );
  }

  ngOnInit(): void {}
}

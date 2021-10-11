import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaymentFrequencyModel } from 'src/app/core/domain/payment-frequency.model';
import { PaymentFrequencyService } from 'src/app/core/services/payment-frequency/payment-frequency.service';

@Component({
  selector: 'app-payment-frequency-modal',
  templateUrl: './payment-frequency-modal.component.html',
  styleUrls: ['./payment-frequency-modal.component.scss']
})
export class PaymentFrequencyModalComponent implements OnInit {
  selected: PaymentFrequencyModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PaymentFrequencyModel[],
    private readonly paymentFrequencyService: PaymentFrequencyService) {
    this.selected = paymentFrequencyService.default;
    this.paymentFrequencyService.selected.subscribe((x) => this.selected = x);
  }

  ngOnInit(): void {

  }

}

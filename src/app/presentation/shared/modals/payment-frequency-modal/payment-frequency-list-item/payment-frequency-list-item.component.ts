import { Component, Input, OnInit } from '@angular/core';
import { PaymentFrequencyModel } from 'src/app/core/domain/payment-frequency.model';
import { PaymentFrequencyService } from 'src/app/core/services/payment-frequency/payment-frequency.service';

@Component({
  selector: 'app-payment-frequency-list-item',
  templateUrl: './payment-frequency-list-item.component.html',
  styleUrls: ['./payment-frequency-list-item.component.scss']
})
export class PaymentFrequencyListItemComponent implements OnInit {
  @Input() isChecked: boolean;
  @Input() data: PaymentFrequencyModel;
  constructor(private readonly paymentFrequencyService:PaymentFrequencyService) { }

  ngOnInit(): void {
  }

  select(): void {
    this.paymentFrequencyService.selected.next(this.data);
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.scss']
})
export class TransferAmountComponent implements OnInit {
  @Input() fromAccount: any;
  @Input() minAmount = 0;
  @Input() maxAmount = 100000;
  @Input() limit: any;
  @Input() validationError: any;
  @Input() currencies: any;
  @Input() memoryAmount: any;
  @Input() conversionRates: any;
  @Input() priceType: string;
  @Input() fixedAirtimeAmounts: any;
  @Output()
  private _paymentAmount = new EventEmitter();
  public get paymentAmount() {
    return this._paymentAmount;
  }
  public set paymentAmount(value) {
    this._paymentAmount = value;
  }
  @Output() selectedCurrency = new EventEmitter();
  @Output() selectingAirtimeAmount = new EventEmitter();
  @Output() selectedAirtimeAmount = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  openCurrencyModal() {

  }

}

import { Component, Input, OnInit } from '@angular/core';

export interface EazzyFxRate {
  image: string;
  fromCurrency: string;
  toCurrency: string;
  buyRate: number;
  sellRate: number;
}

@Component({
  selector: 'app-eazzy-fx-rate',
  templateUrl: './eazzy-fx-rate.component.html',
  styleUrls: ['./eazzy-fx-rate.component.scss'],
})
export class EazzyFxRateComponent implements OnInit {
  @Input()
  rate: EazzyFxRate;

  constructor() {}

  ngOnInit(): void {}
}

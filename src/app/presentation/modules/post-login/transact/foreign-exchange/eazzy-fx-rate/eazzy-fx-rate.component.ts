import { Component, Input, OnInit } from '@angular/core';

export interface EazzyFixRate {
  image: string;
  country: string;
  currency: string;
  priceBuy: number;
  priceSell: number;
}

@Component({
  selector: 'app-eazzy-fx-rate',
  templateUrl: './eazzy-fx-rate.component.html',
  styleUrls: ['./eazzy-fx-rate.component.scss'],
})
export class EazzyFxRateComponent implements OnInit {
  @Input()
  rate: EazzyFixRate;

  constructor() {}

  ngOnInit(): void {}
}

import { Injectable } from '@angular/core';
import { CurrencySelectionModal } from '../../domain/currency-selection.model';

@Injectable()
export class CurrencySelectionConstants {
  constructor() { }
  CURRENCY_LISTINGS: CurrencySelectionModal[] = [{
    text: 'EUR',
    subtext: 'Euro'
  }, {
    text: 'GBP',
    subtext: 'Sterling Pound'
  }, {
    text: 'KES',
    subtext: 'Kenya Shilling'
  }, {
    text: 'USD',
    subtext: 'United States Dollar'
  }, {
    text: 'ZAR',
    subtext: 'South African Rand'
  }];
}
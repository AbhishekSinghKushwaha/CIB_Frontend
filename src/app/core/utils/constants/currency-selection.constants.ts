import { Injectable } from '@angular/core';
import { CurrencySelectionModal } from '../../domain/currency-selection.model';
import { CurrencyModel } from '../../domain/transfer.models';

@Injectable({
  providedIn: 'root'
})
export class CurrencySelectionConstants {
  constructor() { }
  CURRENCY_LISTINGS: CurrencyModel[] = [{
    currencyCode: 'EUR',
    currencyDescription: 'Euro'
  }, {
    currencyCode: 'GBP',
    currencyDescription: 'Sterling Pound'
  }, {
    currencyCode: 'KES',
    currencyDescription: 'Kenya Shilling'
  }, {
    currencyCode: 'USD',
    currencyDescription: 'United States Dollar'
  }, {
    currencyCode: 'ZAR',
    currencyDescription: 'South African Rand'
  }];
}
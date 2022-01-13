import { Injectable } from '@angular/core';
import { FixedRangeModel } from 'src/app/core/domain/fixed-range.model';

@Injectable({
    providedIn: 'root'
})
export class FixedRangeConstants {

  constructor() { }
  
  FIXED_RANGE: FixedRangeModel[] = [{
      text: 100,
      currency: 'DZD',
      subtext: '82.42',
      currencyCode: 'KES'
  }, {
      text: 200,
      currency: 'DZD',
      subtext: '164.84',
      currencyCode: 'KES'
  }, {
      text: 300,
      currency: 'DZD',
      subtext: '291.51',
      currencyCode: 'KES'
  }, {
      text: 350,
      currency: 'DZD',
      subtext: '338.96',
      currencyCode: 'KES'
  }, {
      text: 400,
      currency: 'DZD',
      subtext: '386.22',
      currencyCode: 'KES'
  }];
}
import { Injectable } from '@angular/core';
import { FrequencySelectionModal } from '../../domain/schedule-payment-frequency.model';

@Injectable()
export class FrequencySelectionConstants {
  constructor() { }
  FREQUENCY_LISTINGS: FrequencySelectionModal[] = [{
    text: 'Once-off',
    subtext: 'Description'
  }, {
    text: 'Daily',
  }, {
    text: 'Weekly',
  }, {
    text: 'Monthly',
  }];
}
import { TestBed } from '@angular/core/testing';

import { PaymentFrequencyService } from './payment-frequency.service';

describe('PaymentFrequencyService', () => {
  let service: PaymentFrequencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentFrequencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

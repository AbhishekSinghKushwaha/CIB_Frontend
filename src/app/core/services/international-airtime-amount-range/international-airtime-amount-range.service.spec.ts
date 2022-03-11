import { TestBed } from '@angular/core/testing';

import { InternationalAirtimeAmountRangeService } from './international-airtime-amount-range.service';

describe('InternationalAirtimeAmountRangeService', () => {
  let service: InternationalAirtimeAmountRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternationalAirtimeAmountRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

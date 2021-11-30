import { TestBed } from '@angular/core/testing';

import { MerchantTillNumberService } from './merchant-till-number.service';

describe('MerchantTillNumberService', () => {
  let service: MerchantTillNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantTillNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

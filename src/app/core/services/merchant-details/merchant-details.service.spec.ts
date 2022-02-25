import { TestBed } from '@angular/core/testing';

import { MerchantDetailsService } from './merchant-details.service';

describe('MerchantDetailsService', () => {
  let service: MerchantDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

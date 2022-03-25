import { TestBed } from '@angular/core/testing';

import { BuyAirtimeService } from './buy-airtime.service';

describe('BuyAirtimeService', () => {
  let service: BuyAirtimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyAirtimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

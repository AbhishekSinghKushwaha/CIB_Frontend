import { TestBed } from '@angular/core/testing';

import { AirtimeMobileNumberService } from './airtime-mobile-number.service';

describe('AirtimeMobileNumberService', () => {
  let service: AirtimeMobileNumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirtimeMobileNumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

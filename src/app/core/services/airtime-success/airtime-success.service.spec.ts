import { TestBed } from '@angular/core/testing';

import { AirtimeSuccessService } from './airtime-success.service';

describe('AirtimeSuccessService', () => {
  let service: AirtimeSuccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirtimeSuccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

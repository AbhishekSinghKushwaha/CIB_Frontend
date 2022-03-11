import { TestBed } from '@angular/core/testing';

import { AirtimeFailedService } from './airtime-failed.service';

describe('AirtimeFailedService', () => {
  let service: AirtimeFailedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirtimeFailedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

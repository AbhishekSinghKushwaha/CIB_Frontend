import { TestBed } from '@angular/core/testing';

import { FixedRangeService } from './fixed-range.service';

describe('FixedRangeService', () => {
  let service: FixedRangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixedRangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

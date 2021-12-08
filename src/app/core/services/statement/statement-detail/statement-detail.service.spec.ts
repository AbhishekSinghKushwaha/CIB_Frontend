import { TestBed } from '@angular/core/testing';

import { StatementDetailService } from './statement-detail.service';

describe('StatementDetailService', () => {
  let service: StatementDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { StatementListService } from './statement-list.service';

describe('StatementDetailService', () => {
  let service: StatementListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatementListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

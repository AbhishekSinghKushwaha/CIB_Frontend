import { TestBed } from '@angular/core/testing';

import { BillersService } from './billers.service';

describe('BillersService', () => {
  let service: BillersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

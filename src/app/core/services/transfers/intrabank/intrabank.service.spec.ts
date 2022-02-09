import { TestBed } from '@angular/core/testing';

import { IntrabankService } from './intrabank.service';

describe('IntrabankService', () => {
  let service: IntrabankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntrabankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { InterbankService } from './interbank.service';

describe('InterbankService', () => {
  let service: InterbankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterbankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

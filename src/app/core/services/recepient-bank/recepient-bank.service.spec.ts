import { TestBed } from '@angular/core/testing';

import { RecepientBankService } from './recepient-bank.service';

describe('RecepientBankService', () => {
  let service: RecepientBankService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecepientBankService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BankSelectionService } from './bank-selection.service';

describe('BankSelectionService', () => {
  let service: BankSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

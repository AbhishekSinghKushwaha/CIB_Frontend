import { TestBed } from '@angular/core/testing';

import { CurrencySelectionService } from './currency-selection.service';

describe('CurrencySelectionService', () => {
  let service: CurrencySelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencySelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BeneficiaryAddedService } from './beneficiary-added.service';

describe('BeneficiaryAddedService', () => {
  let service: BeneficiaryAddedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryAddedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

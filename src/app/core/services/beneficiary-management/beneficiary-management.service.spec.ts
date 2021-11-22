import { TestBed } from '@angular/core/testing';

import { BeneficiaryManagementService } from './beneficiary-management.service';

describe('BeneficiaryManagementService', () => {
  let service: BeneficiaryManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

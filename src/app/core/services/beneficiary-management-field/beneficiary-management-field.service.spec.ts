import { TestBed } from '@angular/core/testing';

import { BeneficiaryManagementFieldService } from './beneficiary-management-field.service';

describe('BeneficiaryManagementFieldService', () => {
  let service: BeneficiaryManagementFieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryManagementFieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

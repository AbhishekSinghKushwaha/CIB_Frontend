import { TestBed } from '@angular/core/testing';

import { BeneficiaryManagementFormModalService } from './beneficiary-management-form-modal.service';

describe('BeneficiaryManagementFormModalService', () => {
  let service: BeneficiaryManagementFormModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryManagementFormModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { BeneficiaryManagementModalService } from './beneficiary-management-modal.service';

describe('BeneficiaryManagementModalService', () => {
  let service: BeneficiaryManagementModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeneficiaryManagementModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

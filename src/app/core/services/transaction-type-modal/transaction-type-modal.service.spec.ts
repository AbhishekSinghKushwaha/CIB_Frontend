import { TestBed } from '@angular/core/testing';

import { TransactionTypeModalService } from './transaction-type-modal.service';

describe('TransactionTypeModalService', () => {
  let service: TransactionTypeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionTypeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TransactionReceiptModalService } from './transaction-receipt-modal.service';

describe('TransactionReceiptModalService', () => {
  let service: TransactionReceiptModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionReceiptModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TransferTypeModalService } from './transaction-type-modal.service';

describe('TransferTypeModalService', () => {
  let service: TransferTypeModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferTypeModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

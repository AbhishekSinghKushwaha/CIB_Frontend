import { TestBed } from '@angular/core/testing';

import { BulkTransfersService } from './bulk-transfers.service';

describe('BulkTransfersService', () => {
  let service: BulkTransfersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkTransfersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

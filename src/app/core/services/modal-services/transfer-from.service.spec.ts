import { TestBed } from '@angular/core/testing';

import { TransferFromService } from './transfer-from.service';

describe('TransferFromService', () => {
  let service: TransferFromService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferFromService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

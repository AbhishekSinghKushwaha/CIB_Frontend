import { TestBed } from '@angular/core/testing';

import { TransferToService } from './transfer-to.service';

describe('TransferToService', () => {
  let service: TransferToService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransferToService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

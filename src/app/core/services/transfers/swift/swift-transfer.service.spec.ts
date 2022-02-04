import { TestBed } from '@angular/core/testing';

import { SwiftTransferService } from './swift-transfer.service';

describe('SwiftTransferService', () => {
  let service: SwiftTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwiftTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

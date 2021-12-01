import { TestBed } from '@angular/core/testing';

import { MerchantAddedSuccessfulService } from './merchant-added-successful.service';

describe('MerchantAddedSuccessfulService', () => {
  let service: MerchantAddedSuccessfulService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MerchantAddedSuccessfulService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

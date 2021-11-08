import { TestBed } from '@angular/core/testing';

import { OwnAccountService } from './own-account.service';

describe('OwnAccountService', () => {
  let service: OwnAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

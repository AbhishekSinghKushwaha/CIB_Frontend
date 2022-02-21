import { TestBed } from '@angular/core/testing';

import { SelectAccountAccessService } from './select-account-access.service';

describe('SelectAccountAccessService', () => {
  let service: SelectAccountAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAccountAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

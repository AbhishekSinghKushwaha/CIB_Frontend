import { TestBed } from '@angular/core/testing';

import { SelectAccountSendtoService } from './select-account-sendto.service';

describe('SelectAccountSendtoService', () => {
  let service: SelectAccountSendtoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAccountSendtoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

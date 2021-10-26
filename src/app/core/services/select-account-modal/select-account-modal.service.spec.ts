import { TestBed } from '@angular/core/testing';

import { SelectAccountModalService } from './select-account-modal.service';

describe('SelectAccountModalService', () => {
  let service: SelectAccountModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectAccountModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

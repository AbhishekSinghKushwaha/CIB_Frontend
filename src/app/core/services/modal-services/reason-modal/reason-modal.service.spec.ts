import { TestBed } from '@angular/core/testing';

import { ReasonModalService } from './reason-modal.service';

describe('ReasonModalService', () => {
  let service: ReasonModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasonModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

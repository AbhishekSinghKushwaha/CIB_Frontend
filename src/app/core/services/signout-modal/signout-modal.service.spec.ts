import { TestBed } from '@angular/core/testing';

import { SignoutModalService } from './signout-modal.service';

describe('SignoutModalService', () => {
  let service: SignoutModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignoutModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

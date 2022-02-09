import { TestBed } from '@angular/core/testing';

import { SecurityVerificationGuard } from './security-verification.guard';

describe('SecurityVerificationGuard', () => {
  let guard: SecurityVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecurityVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

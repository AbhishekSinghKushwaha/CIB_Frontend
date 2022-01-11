import { TestBed } from '@angular/core/testing';

import { SecurityChallengeGuard } from './security-challenge.guard';

describe('SecurityChallengeGuard', () => {
  let guard: SecurityChallengeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SecurityChallengeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

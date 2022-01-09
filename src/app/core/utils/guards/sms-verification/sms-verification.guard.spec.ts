import { TestBed } from '@angular/core/testing';

import { SmsVerificationGuard } from './sms-verification.guard';

describe('SmsVerificationGuard', () => {
  let guard: SmsVerificationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SmsVerificationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

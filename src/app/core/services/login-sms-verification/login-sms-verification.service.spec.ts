import { TestBed } from '@angular/core/testing';

import { LoginSmsVerificationService } from './login-sms-verification.service';

describe('LoginSmsVerificationService', () => {
  let service: LoginSmsVerificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginSmsVerificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

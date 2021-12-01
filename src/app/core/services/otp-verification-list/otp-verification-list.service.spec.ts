import { TestBed } from '@angular/core/testing';

import { OtpVerificationListService } from './otp-verification-list.service';

describe('OtpVerificationListService', () => {
  let service: OtpVerificationListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpVerificationListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

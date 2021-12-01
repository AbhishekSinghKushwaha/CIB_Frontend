import { TestBed } from '@angular/core/testing';

import { OtpCodeService } from './otp-code.service';

describe('OtpCodeService', () => {
  let service: OtpCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtpCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

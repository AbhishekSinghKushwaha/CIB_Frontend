import { TestBed } from '@angular/core/testing';

import { SecurityChallengeService } from './security-challenge.service';

describe('SecurityChallengeService', () => {
  let service: SecurityChallengeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SecurityChallengeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

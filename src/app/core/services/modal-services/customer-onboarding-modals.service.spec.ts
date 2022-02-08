import { TestBed } from '@angular/core/testing';

import { CustomerOnboardingModalsService } from './customer-onboarding-modals.service';

describe('CustomerOnboardingModalsService', () => {
  let service: CustomerOnboardingModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerOnboardingModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

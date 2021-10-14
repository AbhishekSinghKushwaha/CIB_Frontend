import { TestBed } from '@angular/core/testing';

import { PaymentReminderService } from './payment-reminder.service';

describe('PaymentReminderService', () => {
  let service: PaymentReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

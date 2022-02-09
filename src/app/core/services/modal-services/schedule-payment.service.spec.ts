import { TestBed } from '@angular/core/testing';

import { SchedulePaymentService } from './schedule-payment.service';

describe('SchedulePaymentService', () => {
  let service: SchedulePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

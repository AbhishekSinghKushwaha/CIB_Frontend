import { TestBed } from '@angular/core/testing';

import { ConfirmPaymentModalService } from './confirm-payment-modal.service';

describe('ConfirmPaymentModalService', () => {
  let service: ConfirmPaymentModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmPaymentModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

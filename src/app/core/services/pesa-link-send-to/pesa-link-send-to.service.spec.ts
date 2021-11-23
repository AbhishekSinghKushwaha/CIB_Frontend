import { TestBed } from '@angular/core/testing';

import { PesaLinkSendToService } from './pesa-link-send-to.service';

describe('PesaLinkSendToService', () => {
  let service: PesaLinkSendToService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PesaLinkSendToService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

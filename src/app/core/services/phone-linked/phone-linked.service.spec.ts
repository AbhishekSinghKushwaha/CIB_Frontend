import { TestBed } from '@angular/core/testing';

import { PhoneLinkedService } from './phone-linked.service';

describe('PhoneLinkedService', () => {
  let service: PhoneLinkedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneLinkedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

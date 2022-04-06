import { TestBed } from '@angular/core/testing';

import { IntercountryService } from './intercountry.service';

describe('IntercountryService', () => {
  let service: IntercountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntercountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

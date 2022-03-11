import { TestBed } from '@angular/core/testing';

import { TelcoService } from './telco.service';

describe('TelcoService', () => {
  let service: TelcoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelcoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

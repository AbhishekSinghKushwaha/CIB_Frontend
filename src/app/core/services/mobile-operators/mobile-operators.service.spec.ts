import { TestBed } from '@angular/core/testing';

import { MobileOperatorsService } from './mobile-operators.service';

describe('MobileOperatorsService', () => {
  let service: MobileOperatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MobileOperatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

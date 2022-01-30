import { TestBed } from '@angular/core/testing';

import { NumberSelectModalService } from './number-select-modal.service';

describe('NumberSelectModalService', () => {
  let service: NumberSelectModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NumberSelectModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

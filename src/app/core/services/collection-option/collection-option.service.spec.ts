import { TestBed } from '@angular/core/testing';

import { CollectionOptionService } from './collection-option.service';

describe('CollectionOptionService', () => {
  let service: CollectionOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollectionOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

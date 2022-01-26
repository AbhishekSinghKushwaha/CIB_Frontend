import { TestBed } from '@angular/core/testing';

import { SwiftModalsService } from './swift-modals.service';

describe('SwiftModalsService', () => {
  let service: SwiftModalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwiftModalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

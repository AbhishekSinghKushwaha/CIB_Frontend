import { TestBed } from '@angular/core/testing';

import { OwnequityModalService } from './ownequity-modal.service';

describe('OwnequityModalService', () => {
  let service: OwnequityModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnequityModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

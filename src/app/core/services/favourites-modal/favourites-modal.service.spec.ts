import { TestBed } from '@angular/core/testing';

import { FavouritesModalService } from './favourites-modal.service';

describe('FavouritesModalService', () => {
  let service: FavouritesModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavouritesModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

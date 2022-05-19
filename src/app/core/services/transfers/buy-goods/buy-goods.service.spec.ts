import { TestBed } from '@angular/core/testing';

import { BuyGoodsService } from './buy-goods.service';

describe('BuyGoodsService', () => {
  let service: BuyGoodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyGoodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

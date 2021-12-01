import { TestBed } from '@angular/core/testing';

import { BuyGoodsPayToService } from './buy-goods-pay-to.service';

describe('BuyGoodsPayToService', () => {
  let service: BuyGoodsPayToService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyGoodsPayToService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGoodsPayToComponent } from './buy-goods-pay-to.component';

describe('BuyGoodsPayToComponent', () => {
  let component: BuyGoodsPayToComponent;
  let fixture: ComponentFixture<BuyGoodsPayToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyGoodsPayToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyGoodsPayToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

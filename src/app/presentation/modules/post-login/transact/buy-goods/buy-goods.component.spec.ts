import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGoodsComponent } from './buy-goods.component';

describe('BuyGoodsComponent', () => {
  let component: BuyGoodsComponent;
  let fixture: ComponentFixture<BuyGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGoodsNewRecipientComponent } from './buy-goods-new-recipient.component';

describe('BuyGoodsNewRecipientComponent', () => {
  let component: BuyGoodsNewRecipientComponent;
  let fixture: ComponentFixture<BuyGoodsNewRecipientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyGoodsNewRecipientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyGoodsNewRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

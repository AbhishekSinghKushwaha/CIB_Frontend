import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyairtimeAmountComponent } from './buyairtime-amount.component';

describe('BuyairtimeAmountComponent', () => {
  let component: BuyairtimeAmountComponent;
  let fixture: ComponentFixture<BuyairtimeAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyairtimeAmountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyairtimeAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

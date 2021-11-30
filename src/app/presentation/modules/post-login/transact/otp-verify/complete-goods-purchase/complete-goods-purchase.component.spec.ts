import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteGoodsPurchaseComponent } from './complete-goods-purchase.component';

describe('CompleteGoodsPurchaseComponent', () => {
  let component: CompleteGoodsPurchaseComponent;
  let fixture: ComponentFixture<CompleteGoodsPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteGoodsPurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteGoodsPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

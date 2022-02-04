import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCategoryModalComponent } from './payment-category-modal.component';

describe('PaymentCategoryModalComponent', () => {
  let component: PaymentCategoryModalComponent;
  let fixture: ComponentFixture<PaymentCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

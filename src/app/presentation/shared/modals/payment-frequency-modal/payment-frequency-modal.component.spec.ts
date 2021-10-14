import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFrequencyModalComponent } from './payment-frequency-modal.component';

describe('PaymentFrequencyModalComponent', () => {
  let component: PaymentFrequencyModalComponent;
  let fixture: ComponentFixture<PaymentFrequencyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFrequencyModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFrequencyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

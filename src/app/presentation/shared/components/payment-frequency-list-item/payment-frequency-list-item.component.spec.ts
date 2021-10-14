import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFrequencyListItemComponent } from './payment-frequency-list-item.component';

describe('PaymentFrequencyListItemComponent', () => {
  let component: PaymentFrequencyListItemComponent;
  let fixture: ComponentFixture<PaymentFrequencyListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentFrequencyListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentFrequencyListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

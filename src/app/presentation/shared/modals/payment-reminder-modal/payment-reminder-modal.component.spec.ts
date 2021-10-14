import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReminderModalComponent } from './payment-reminder-modal.component';

describe('PaymentReminderModalComponent', () => {
  let component: PaymentReminderModalComponent;
  let fixture: ComponentFixture<PaymentReminderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentReminderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReminderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReminderListItemsComponent } from './payment-reminder-list-items.component';

describe('PaymentReminderListItemsComponent', () => {
  let component: PaymentReminderListItemsComponent;
  let fixture: ComponentFixture<PaymentReminderListItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentReminderListItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentReminderListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulePaymentInputComponent } from './schedule-payment-input.component';

describe('SchedulePaymentInputComponent', () => {
  let component: SchedulePaymentInputComponent;
  let fixture: ComponentFixture<SchedulePaymentInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulePaymentInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulePaymentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

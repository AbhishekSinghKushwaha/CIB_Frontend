import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityOtpVerificationComponent } from './activity-otp-verification.component';

describe('ActivityOtpVerificationComponent', () => {
  let component: ActivityOtpVerificationComponent;
  let fixture: ComponentFixture<ActivityOtpVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityOtpVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityOtpVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

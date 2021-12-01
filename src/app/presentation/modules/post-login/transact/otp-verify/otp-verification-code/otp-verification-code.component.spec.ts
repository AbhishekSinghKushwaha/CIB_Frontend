import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationCodeComponent } from './otp-verification-code.component';

describe('OtpVerificationCodeComponent', () => {
  let component: OtpVerificationCodeComponent;
  let fixture: ComponentFixture<OtpVerificationCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerificationCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerificationCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

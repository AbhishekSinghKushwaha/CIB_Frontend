import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationSelectComponent } from './otp-verification-select.component';

describe('OtpVerificationSelectComponent', () => {
  let component: OtpVerificationSelectComponent;
  let fixture: ComponentFixture<OtpVerificationSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerificationSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerificationSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

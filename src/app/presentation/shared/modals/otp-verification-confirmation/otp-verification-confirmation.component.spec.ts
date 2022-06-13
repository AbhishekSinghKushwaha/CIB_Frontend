import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationConfirmationComponent } from './otp-verification-confirmation.component';

describe('OtpVerificationConfirmationComponent', () => {
  let component: OtpVerificationConfirmationComponent;
  let fixture: ComponentFixture<OtpVerificationConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerificationConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerificationConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

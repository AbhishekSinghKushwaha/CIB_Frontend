import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpAccessVerificationComponent } from './otp-access-verification.component';

describe('OtpAccessVerificationComponent', () => {
  let component: OtpAccessVerificationComponent;
  let fixture: ComponentFixture<OtpAccessVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpAccessVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpAccessVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

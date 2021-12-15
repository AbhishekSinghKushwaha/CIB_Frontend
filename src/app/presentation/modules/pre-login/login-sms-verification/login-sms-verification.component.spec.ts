import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSmsVerificationComponent } from './login-sms-verification.component';

describe('SmsVerificationComponent', () => {
  let component: LoginSmsVerificationComponent;
  let fixture: ComponentFixture<LoginSmsVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSmsVerificationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSmsVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

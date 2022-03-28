import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecurityVerificationComponent } from './login-security-verification.component';

describe('LoginSecurityVerificationComponent', () => {
  let component: LoginSecurityVerificationComponent;
  let fixture: ComponentFixture<LoginSecurityVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSecurityVerificationComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSecurityVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

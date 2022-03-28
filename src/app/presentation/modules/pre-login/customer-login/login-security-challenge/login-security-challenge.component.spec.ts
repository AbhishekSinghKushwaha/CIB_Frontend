import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSecurityChallengeComponent } from './login-security-challenge.component';

describe('LoginSecurityChallengeComponent', () => {
  let component: LoginSecurityChallengeComponent;
  let fixture: ComponentFixture<LoginSecurityChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginSecurityChallengeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginSecurityChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

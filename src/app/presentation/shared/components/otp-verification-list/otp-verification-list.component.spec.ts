import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpVerificationListComponent } from './otp-verification-list.component';

describe('OtpVerificationListComponent', () => {
  let component: OtpVerificationListComponent;
  let fixture: ComponentFixture<OtpVerificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpVerificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpVerificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

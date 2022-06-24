import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpAccessComponent } from './otp-access.component';

describe('OtpAccessComponent', () => {
  let component: OtpAccessComponent;
  let fixture: ComponentFixture<OtpAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

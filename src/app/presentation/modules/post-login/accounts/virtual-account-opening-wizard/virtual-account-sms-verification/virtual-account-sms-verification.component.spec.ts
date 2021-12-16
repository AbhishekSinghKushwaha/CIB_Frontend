import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualAccountSmsVerificationComponent } from './virtual-account-sms-verification.component';

describe('VirtualAccountSmsVerificationComponent', () => {
  let component: VirtualAccountSmsVerificationComponent;
  let fixture: ComponentFixture<VirtualAccountSmsVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualAccountSmsVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountSmsVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

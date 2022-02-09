import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VirtualAccountEmailVerificationComponent } from './virtual-account-email-verification.component';

describe('VirtualAccountEmailVerificationComponent', () => {
  let component: VirtualAccountEmailVerificationComponent;
  let fixture: ComponentFixture<VirtualAccountEmailVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VirtualAccountEmailVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VirtualAccountEmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

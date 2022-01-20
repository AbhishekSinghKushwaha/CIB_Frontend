import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnboardingRegistrationModalComponent } from './customer-onboarding-registration-modal.component';

describe('CustomerOnboardingRegistrationModalComponent', () => {
  let component: CustomerOnboardingRegistrationModalComponent;
  let fixture: ComponentFixture<CustomerOnboardingRegistrationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOnboardingRegistrationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnboardingRegistrationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

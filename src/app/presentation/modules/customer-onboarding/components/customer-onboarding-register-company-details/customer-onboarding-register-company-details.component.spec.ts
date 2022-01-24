import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnboardingRegisterCompanyDetailsComponent } from './customer-onboarding-register-company-details.component';

describe('CustomerOnboardingRegisterCompanyDetailsComponent', () => {
  let component: CustomerOnboardingRegisterCompanyDetailsComponent;
  let fixture: ComponentFixture<CustomerOnboardingRegisterCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOnboardingRegisterCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnboardingRegisterCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

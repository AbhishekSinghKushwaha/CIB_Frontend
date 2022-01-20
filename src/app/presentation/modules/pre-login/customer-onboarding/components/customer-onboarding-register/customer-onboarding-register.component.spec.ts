import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnboardingRegisterComponent } from './customer-onboarding-register.component';

describe('CustomerOnboardingRegisterComponent', () => {
  let component: CustomerOnboardingRegisterComponent;
  let fixture: ComponentFixture<CustomerOnboardingRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOnboardingRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnboardingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

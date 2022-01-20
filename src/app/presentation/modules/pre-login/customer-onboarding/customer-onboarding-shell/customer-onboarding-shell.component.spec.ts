import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerOnboardingShellComponent } from './customer-onboarding-shell.component';

describe('CustomerOnboardingShellComponent', () => {
  let component: CustomerOnboardingShellComponent;
  let fixture: ComponentFixture<CustomerOnboardingShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerOnboardingShellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnboardingShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

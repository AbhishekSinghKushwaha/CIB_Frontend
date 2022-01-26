import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerOnboardingAccountComponent } from './customer-onboarding-account.component';

describe('CustomerOnboardingAccountComponent', () => {
  let component: CustomerOnboardingAccountComponent;
  let fixture: ComponentFixture<CustomerOnboardingAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerOnboardingAccountComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerOnboardingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

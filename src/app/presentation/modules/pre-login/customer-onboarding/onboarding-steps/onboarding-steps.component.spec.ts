import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingStepsComponent } from './onboarding-steps.component';

describe('OnboardingStepsComponent', () => {
  let component: OnboardingStepsComponent;
  let fixture: ComponentFixture<OnboardingStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

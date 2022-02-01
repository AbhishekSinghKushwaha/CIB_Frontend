import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingSlidersComponent } from './onboarding-sliders.component';

describe('OnboardingSlidersComponent', () => {
  let component: OnboardingSlidersComponent;
  let fixture: ComponentFixture<OnboardingSlidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnboardingSlidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingSlidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

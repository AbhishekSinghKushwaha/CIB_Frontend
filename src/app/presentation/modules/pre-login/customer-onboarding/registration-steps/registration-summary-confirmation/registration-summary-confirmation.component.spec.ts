import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationSummaryConfirmationComponent } from './registration-summary-confirmation.component';

describe('RegistrationSummaryConfirmationComponent', () => {
  let component: RegistrationSummaryConfirmationComponent;
  let fixture: ComponentFixture<RegistrationSummaryConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationSummaryConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationSummaryConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

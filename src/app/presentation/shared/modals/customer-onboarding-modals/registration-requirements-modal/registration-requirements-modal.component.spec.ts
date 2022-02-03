import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationRequirementsModalComponent } from './registration-requirements-modal.component';

describe('RegistrationRequirementsModalComponent', () => {
  let component: RegistrationRequirementsModalComponent;
  let fixture: ComponentFixture<RegistrationRequirementsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationRequirementsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationRequirementsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

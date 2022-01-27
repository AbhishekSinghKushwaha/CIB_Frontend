import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationStartDetailsComponent } from './registration-start-details.component';

describe('RegistrationStartDetailsComponent', () => {
  let component: RegistrationStartDetailsComponent;
  let fixture: ComponentFixture<RegistrationStartDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationStartDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationStartDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

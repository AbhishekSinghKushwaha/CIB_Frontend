import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderSelectionComponent } from './reminder-selection.component';

describe('ReminderSelectionComponent', () => {
  let component: ReminderSelectionComponent;
  let fixture: ComponentFixture<ReminderSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

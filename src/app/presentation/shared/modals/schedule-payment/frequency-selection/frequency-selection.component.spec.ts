import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencySelectionComponent } from './frequency-selection.component';

describe('FrequencySelectionComponent', () => {
  let component: FrequencySelectionComponent;
  let fixture: ComponentFixture<FrequencySelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FrequencySelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FrequencySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

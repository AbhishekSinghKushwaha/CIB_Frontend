import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberSelectModalComponent } from './number-select-modal.component';

describe('NumberSelectModalComponent', () => {
  let component: NumberSelectModalComponent;
  let fixture: ComponentFixture<NumberSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberSelectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

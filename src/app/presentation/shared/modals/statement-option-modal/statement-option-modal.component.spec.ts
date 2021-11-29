import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementOptionModalComponent } from './statement-option-modal.component';

describe('StatementOptionModalComponent', () => {
  let component: StatementOptionModalComponent;
  let fixture: ComponentFixture<StatementOptionModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementOptionModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementOptionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanActionComponent } from './loan-action.component';

describe('LoanActionComponent', () => {
  let component: LoanActionComponent;
  let fixture: ComponentFixture<LoanActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

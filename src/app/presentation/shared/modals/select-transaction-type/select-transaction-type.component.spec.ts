import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTransactionTypeComponent } from './select-transaction-type.component';

describe('SelectTransactionTypeComponent', () => {
  let component: SelectTransactionTypeComponent;
  let fixture: ComponentFixture<SelectTransactionTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTransactionTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTransactionTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

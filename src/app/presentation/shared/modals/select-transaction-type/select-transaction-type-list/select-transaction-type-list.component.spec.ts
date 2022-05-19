import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTransactionTypeListComponent } from './select-transaction-type-list.component';

describe('SelectTransactionTypeListComponent', () => {
  let component: SelectTransactionTypeListComponent;
  let fixture: ComponentFixture<SelectTransactionTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTransactionTypeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTransactionTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

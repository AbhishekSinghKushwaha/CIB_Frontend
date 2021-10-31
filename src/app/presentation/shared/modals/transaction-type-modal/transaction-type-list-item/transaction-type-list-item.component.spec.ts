import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeListItemComponent } from './transaction-type-list-item.component';

describe('TransactionTypeListItemComponent', () => {
  let component: TransactionTypeListItemComponent;
  let fixture: ComponentFixture<TransactionTypeListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTypeListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTypeListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

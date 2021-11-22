import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionTypeModalComponent } from './transaction-type-modal.component';

describe('TransactionTypeModalComponent', () => {
  let component: TransactionTypeModalComponent;
  let fixture: ComponentFixture<TransactionTypeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionTypeModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

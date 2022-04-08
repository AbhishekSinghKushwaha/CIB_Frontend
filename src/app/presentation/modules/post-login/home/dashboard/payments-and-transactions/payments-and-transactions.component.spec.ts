import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsAndTransactionsComponent } from './payments-and-transactions.component';

describe('PaymentsAndTransactionsComponent', () => {
  let component: PaymentsAndTransactionsComponent;
  let fixture: ComponentFixture<PaymentsAndTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentsAndTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsAndTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

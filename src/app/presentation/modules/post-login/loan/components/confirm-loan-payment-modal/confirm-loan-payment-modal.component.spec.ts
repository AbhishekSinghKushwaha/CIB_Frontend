import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmLoanPaymentModalComponent } from './confirm-loan-payment-modal.component';

describe('ConfirmLoanPaymentModalComponent', () => {
  let component: ConfirmLoanPaymentModalComponent;
  let fixture: ComponentFixture<ConfirmLoanPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmLoanPaymentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmLoanPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayLoanModalComponent } from './pay-loan-modal.component';

describe('PayLoanModalComponent', () => {
  let component: PayLoanModalComponent;
  let fixture: ComponentFixture<PayLoanModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayLoanModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayLoanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

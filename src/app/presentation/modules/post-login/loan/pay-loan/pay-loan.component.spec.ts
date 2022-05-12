import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayLoanComponent } from './pay-loan.component';

describe('PayLoanComponent', () => {
  let component: PayLoanComponent;
  let fixture: ComponentFixture<PayLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

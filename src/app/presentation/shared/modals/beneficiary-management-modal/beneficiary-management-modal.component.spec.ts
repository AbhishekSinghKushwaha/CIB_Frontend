import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryManagementModalComponent } from './beneficiary-management-modal.component';

describe('BeneficiaryManagementModalComponent', () => {
  let component: BeneficiaryManagementModalComponent;
  let fixture: ComponentFixture<BeneficiaryManagementModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryManagementModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryManagementModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

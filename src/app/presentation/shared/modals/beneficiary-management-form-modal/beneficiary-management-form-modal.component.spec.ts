import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryManagementFormModalComponent } from './beneficiary-management-form-modal.component';

describe('BeneficiaryManagementFormModalComponent', () => {
  let component: BeneficiaryManagementFormModalComponent;
  let fixture: ComponentFixture<BeneficiaryManagementFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryManagementFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryManagementFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

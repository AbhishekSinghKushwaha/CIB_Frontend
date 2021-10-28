import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryManagementFormComponent } from './beneficiary-management-form.component';

describe('BeneficiaryManagementFormComponent', () => {
  let component: BeneficiaryManagementFormComponent;
  let fixture: ComponentFixture<BeneficiaryManagementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryManagementFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

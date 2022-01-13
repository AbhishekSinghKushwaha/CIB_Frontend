import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryAddedComponent } from './beneficiary-added.component';

describe('BeneficiaryAddedComponent', () => {
  let component: BeneficiaryAddedComponent;
  let fixture: ComponentFixture<BeneficiaryAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryAddedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

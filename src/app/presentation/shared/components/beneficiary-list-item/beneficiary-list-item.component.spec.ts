import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryListItemComponent } from './beneficiary-list-item.component';

describe('BeneficiaryListItemComponent', () => {
  let component: BeneficiaryListItemComponent;
  let fixture: ComponentFixture<BeneficiaryListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficiaryListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

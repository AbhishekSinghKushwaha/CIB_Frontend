import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankSelectionListItemComponent } from './bank-selection-list-item.component';

describe('BankSelectionListItemComponent', () => {
  let component: BankSelectionListItemComponent;
  let fixture: ComponentFixture<BankSelectionListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankSelectionListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankSelectionListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

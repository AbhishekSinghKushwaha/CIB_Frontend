import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankListItemComponent } from './bank-list-item.component';

describe('BankListItemComponent', () => {
  let component: BankListItemComponent;
  let fixture: ComponentFixture<BankListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

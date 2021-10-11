import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDropdownItemComponent } from './account-dropdown-item.component';

describe('AccountDropdownItemComponent', () => {
  let component: AccountDropdownItemComponent;
  let fixture: ComponentFixture<AccountDropdownItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountDropdownItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

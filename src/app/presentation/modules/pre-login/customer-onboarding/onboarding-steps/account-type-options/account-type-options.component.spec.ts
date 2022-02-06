import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeOptionsComponent } from './account-type-options.component';

describe('AccountTypeOptionsComponent', () => {
  let component: AccountTypeOptionsComponent;
  let fixture: ComponentFixture<AccountTypeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountTypeOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

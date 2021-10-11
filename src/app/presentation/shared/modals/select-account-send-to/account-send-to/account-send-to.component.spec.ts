import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSendToComponent } from './account-send-to.component';

describe('AccountSendToComponent', () => {
  let component: AccountSendToComponent;
  let fixture: ComponentFixture<AccountSendToComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSendToComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSendToComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

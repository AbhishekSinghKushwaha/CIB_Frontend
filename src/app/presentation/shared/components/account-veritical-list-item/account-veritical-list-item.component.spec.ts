import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountVeriticalListItemComponent } from './account-veritical-list-item.component';

describe('AccountVeriticalListItemComponent', () => {
  let component: AccountVeriticalListItemComponent;
  let fixture: ComponentFixture<AccountVeriticalListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountVeriticalListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountVeriticalListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

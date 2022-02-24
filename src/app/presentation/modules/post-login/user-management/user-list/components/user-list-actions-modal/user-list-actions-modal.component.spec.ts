import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListActionsModalComponent } from './user-list-actions-modal.component';

describe('UserListActionsModalComponent', () => {
  let component: UserListActionsModalComponent;
  let fixture: ComponentFixture<UserListActionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListActionsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

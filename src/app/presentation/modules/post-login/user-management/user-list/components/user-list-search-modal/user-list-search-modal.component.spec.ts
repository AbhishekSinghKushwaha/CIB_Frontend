import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListSearchModalComponent } from './user-list-search-modal.component';

describe('UserListSearchModalComponent', () => {
  let component: UserListSearchModalComponent;
  let fixture: ComponentFixture<UserListSearchModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListSearchModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListSearchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

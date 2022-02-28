import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementSuccessComponent } from './user-management-success.component';

describe('UserManagementSuccessComponent', () => {
  let component: UserManagementSuccessComponent;
  let fixture: ComponentFixture<UserManagementSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserManagementSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserManagementSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

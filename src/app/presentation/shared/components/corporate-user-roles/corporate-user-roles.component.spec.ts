import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateUserRolesComponent } from './corporate-user-roles.component';

describe('CorporateUserRolesComponent', () => {
  let component: CorporateUserRolesComponent;
  let fixture: ComponentFixture<CorporateUserRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CorporateUserRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CorporateUserRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

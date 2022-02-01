import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberRolesComponent } from './team-member-roles.component';

describe('TeamMemberRolesComponent', () => {
  let component: TeamMemberRolesComponent;
  let fixture: ComponentFixture<TeamMemberRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMemberRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMemberRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

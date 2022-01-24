import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersDetailsComponent } from './team-members-details.component';

describe('TeamMembersDetailsComponent', () => {
  let component: TeamMembersDetailsComponent;
  let fixture: ComponentFixture<TeamMembersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMembersDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

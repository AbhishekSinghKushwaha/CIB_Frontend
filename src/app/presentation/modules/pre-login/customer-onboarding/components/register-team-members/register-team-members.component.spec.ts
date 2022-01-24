import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTeamMembersComponent } from './register-team-members.component';

describe('RegisterTeamMembersComponent', () => {
  let component: RegisterTeamMembersComponent;
  let fixture: ComponentFixture<RegisterTeamMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTeamMembersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

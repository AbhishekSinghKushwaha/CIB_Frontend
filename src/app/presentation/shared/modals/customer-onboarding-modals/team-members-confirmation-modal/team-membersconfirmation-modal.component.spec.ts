import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMembersConfirmationModalComponent } from './team-members-confirmation-modal.component';

describe('TeamMembersConfirmationModalComponent', () => {
  let component: TeamMembersConfirmationModalComponent;
  let fixture: ComponentFixture<TeamMembersConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamMembersConfirmationModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamMembersConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

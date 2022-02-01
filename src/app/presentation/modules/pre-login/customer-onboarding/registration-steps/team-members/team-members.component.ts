import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TeamMember } from 'src/app/core/domain/customer-onboarding.model';
import { TeamMembersService } from 'src/app/core/services/customer-onboarding/team-members.service';
import { StorageService } from 'src/app/core/services/storage/storage.service';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';
import { TeamMembersConfirmationModalComponent } from 'src/app/presentation/shared/modals/customer-onboarding-modals/team-members-confirmation-modal/team-members-confirmation-modal.component';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.scss'],
})
export class TeamMembersComponent implements OnInit {
  members: TeamMember[] = [];

  teamMemberDetailsForm: FormGroup;

  constructor(
    private readonly dialog: MatDialog,
    private readonly teamMemberService: TeamMembersService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.getTeamMembers();
  }

  @confirmModal({
    title: 'Are you sure',
    message:
      'Once you remove a team member, all their details will be deleted. You can add them again anytime.',
    cancelText: "No, I'm not",
    confirmText: "Yes, I'm sure",
  })
  delete(corporateUserId: string) {
    this.teamMemberService
      .deleteTeamMember(corporateUserId)
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.getTeamMembers();
        }
      });
  }

  getTeamMembers() {
    this.teamMemberService
      .getTeamMembers(this.storageService.getData('corporateId'))
      .subscribe((res) => {
        if (res.isSuccessful) {
          this.members = res.data;
        }
      });
  }

  confirmTeamMembers() {
    this.dialog.open<TeamMembersConfirmationModalComponent>(
      TeamMembersConfirmationModalComponent,
      { disableClose: true, data: this.members }
    );
  }

  generateInitials(name: string): string {
    let initials = '';

    for (let i = 0; i < name.length; i++) {
      if (name.charAt(i) === ' ') {
        continue;
      }

      if (name.charAt(i) === name.charAt(i).toUpperCase()) {
        initials += name.charAt(i);

        if (initials.length === 2) {
          break;
        }
      }
    }

    return initials;
  }
}

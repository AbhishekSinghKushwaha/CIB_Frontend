import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TeamMember } from 'src/app/core/domain/customer-onboarding.model';

@Component({
  selector: 'app-team-members-confirmation-modal',
  templateUrl: './team-members-confirmation-modal.component.html',
  styleUrls: ['./team-members-confirmation-modal.component.scss'],
})
export class TeamMembersConfirmationModalComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<TeamMembersConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TeamMember[]
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  submitReview() {
    this.close();
    setTimeout(() => {
      this.router.navigate([
        '/auth/customer-onboarding/register/product-services',
      ]);
    }, 0);
  }
}

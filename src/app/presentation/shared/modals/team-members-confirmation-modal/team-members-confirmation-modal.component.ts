import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-team-members-confirmation-modal',
  templateUrl: './team-members-confirmation-modal.component.html',
  styleUrls: ['./team-members-confirmation-modal.component.scss']
})
export class TeamMembersConfirmationModalComponent implements OnInit {

  constructor(private readonly router: Router,
    private readonly dialogRef: MatDialogRef<TeamMembersConfirmationModalComponent>,) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  submitReview() {
    this.close();
    setTimeout(() => {
      this.router.navigate(['/customer-onboarding/products']);
    }, 0);

  }
}

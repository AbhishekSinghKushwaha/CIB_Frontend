import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director-confirmation-modal',
  templateUrl: './director-confirmation-modal.component.html',
  styleUrls: ['./director-confirmation-modal.component.scss'],
})
export class DirectorConfirmationModalComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<DirectorConfirmationModalComponent>
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  submitReview() {
    this.close();
    setTimeout(() => {
      this.router.navigate(['/auth/customer-onboarding/register/team-members']);
    }, 0);
  }
}

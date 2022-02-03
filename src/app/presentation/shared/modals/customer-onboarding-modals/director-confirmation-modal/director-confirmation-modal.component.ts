import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Director } from 'src/app/core/domain/customer-onboarding.model';

@Component({
  selector: 'app-director-confirmation-modal',
  templateUrl: './director-confirmation-modal.component.html',
  styleUrls: ['./director-confirmation-modal.component.scss'],
})
export class DirectorConfirmationModalComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly dialogRef: MatDialogRef<DirectorConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Director[]
  ) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  submitReview() {
    this.close();
    this.router.navigate(['/auth/customer-onboarding/register/team-members']);
  }
}

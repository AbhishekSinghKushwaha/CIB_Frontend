import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list-actions-modal',
  templateUrl: './user-list-actions-modal.component.html',
  styleUrls: ['./user-list-actions-modal.component.scss'],
})
export class UserListActionsModalComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<UserListActionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  disable(): void {}

  remove(): void {}

  edit(): void {
    this.close();
    this.router.navigate(['user-management/edit', this.data.userId]);
  }
}

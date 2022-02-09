import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { confirmModal } from 'src/app/presentation/shared/decorators/confirm-dialog.decorator';

export type UserListAction = 'enable' | 'disable' | 'edit' | 'remove';

@Component({
  selector: 'app-user-list-actions-modal',
  templateUrl: './user-list-actions-modal.component.html',
  styleUrls: ['./user-list-actions-modal.component.scss'],
})
export class UserListActionsModalComponent implements OnInit {
  userEnabled: boolean;

  constructor(
    private readonly dialogRef: MatDialogRef<UserListActionsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {
    this.userEnabled = this.data.userEnabled;
  }

  ngOnInit(): void {}

  close(result: UserListAction | undefined = undefined): void {
    this.dialogRef.close(result);
  }

  @confirmModal({
    title: 'Do you want to enable this user?',
    message:
      'Once you enable a user, they will have access to key roles and responsibilities',
    cancelText: 'No',
    confirmText: 'Yes',
  })
  enable(): void {
    this.close('enable');
  }

  @confirmModal({
    title: 'Do you want to disable this user?',
    message:
      'Once you disable a user, they will lose access to key roles and responsibilities',
    cancelText: 'No',
    confirmText: 'Yes',
  })
  disable(): void {
    this.close('disable');
  }

  @confirmModal({
    title: 'Are you sure',
    message:
      'Once you remove a user, all their details will be deleted. You can add them again anytime.',
    cancelText: "No, I'm not",
    confirmText: "Yes, I'm sure",
  })
  remove() {
    this.close('remove');
  }

  edit(): void {
    this.close('edit');
  }
}

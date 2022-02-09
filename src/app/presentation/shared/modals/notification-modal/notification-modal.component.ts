import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PreLoginModal } from '../../../../core/domain/pre-login-modal.model';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent implements OnInit {

  constructor(readonly dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PreLoginModal) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  onClose(event: boolean) {
    event && this.dialogRef.close(true);
  }

}

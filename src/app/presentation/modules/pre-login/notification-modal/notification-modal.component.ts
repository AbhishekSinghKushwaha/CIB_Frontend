import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPreLoginModal } from './../../../../core/interfaces/pre-login-modal.interface';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NotificationModalComponent implements OnInit {

  constructor(readonly dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPreLoginModal) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

}

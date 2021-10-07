import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SignOutModal } from '../../../../core/domain/sign-out-modal.model';

@Component({
  selector: 'app-signout-modal',
  templateUrl: './signout-modal.component.html',
  styleUrls: ['./signout-modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignoutModalComponent implements OnInit {

  constructor(readonly dialogRef: MatDialogRef<SignoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SignOutModal) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }
}

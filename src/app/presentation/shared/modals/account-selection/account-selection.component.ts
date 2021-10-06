import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccountSelectionModal } from '../../../../core/domain/account-selection.model';

@Component({
  selector: 'app-account-selection',
  templateUrl: './account-selection.component.html',
  styleUrls: ['./account-selection.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSelectionComponent implements OnInit {

  constructor(
    readonly dialogRef: MatDialogRef<AccountSelectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AccountSelectionModal
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

}

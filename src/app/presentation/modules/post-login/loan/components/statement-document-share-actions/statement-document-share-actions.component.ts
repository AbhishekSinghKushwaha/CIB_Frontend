import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-statement-document-share-actions',
  templateUrl: './statement-document-share-actions.component.html',
  styleUrls: ['./statement-document-share-actions.component.scss'],
})
export class StatementDocumentShareActionsComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<StatementDocumentShareActionsComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}

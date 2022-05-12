import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-statement-document-download-actions',
  templateUrl: './statement-document-download-actions.component.html',
  styleUrls: ['./statement-document-download-actions.component.scss'],
})
export class StatementDocumentDownloadActionsComponent {
  constructor(
    private readonly dialogRef: MatDialogRef<StatementDocumentDownloadActionsComponent>,
    @Inject(MAT_DIALOG_DATA) private readonly data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}

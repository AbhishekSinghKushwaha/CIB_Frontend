import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StatementDocumentDownloadActionsComponent } from '../statement-document-download-actions/statement-document-download-actions.component';
import { StatementDocumentShareActionsComponent } from '../statement-document-share-actions/statement-document-share-actions.component';

@Component({
  selector: 'app-statement-document',
  templateUrl: './statement-document.component.html',
  styleUrls: ['./statement-document.component.scss'],
})
export class StatementDocumentComponent implements OnInit {
  constructor(
    private readonly dialogRef: MatDialogRef<StatementDocumentComponent>,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  download(): void {
    this.dialog.open<StatementDocumentDownloadActionsComponent>(
      StatementDocumentDownloadActionsComponent,
      { width: '300px' }
    );
  }

  share(): void {
    this.dialog.open<StatementDocumentShareActionsComponent>(
      StatementDocumentShareActionsComponent,
      { width: '400px' }
    );
  }
}

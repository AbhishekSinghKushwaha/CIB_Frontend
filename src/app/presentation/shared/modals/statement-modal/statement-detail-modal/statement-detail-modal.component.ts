import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-statement-detail-modal',
  templateUrl: './statement-detail-modal.component.html',
  styleUrls: ['./statement-detail-modal.component.scss']
})
export class StatementDetailModalComponent implements OnInit {

  constructor(readonly dialogRef: MatDialogRef<StatementDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }
}

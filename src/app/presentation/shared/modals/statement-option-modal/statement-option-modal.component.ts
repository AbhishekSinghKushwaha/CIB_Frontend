import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-statement-option-modal',
  templateUrl: './statement-option-modal.component.html',
  styleUrls: ['./statement-option-modal.component.scss']
})
export class StatementOptionModalComponent implements OnInit {

  constructor(readonly dialogRef: MatDialogRef<StatementOptionModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(true);
  }
}

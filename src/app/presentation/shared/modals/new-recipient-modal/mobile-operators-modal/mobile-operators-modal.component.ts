import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mobile-operators-modal',
  templateUrl: './mobile-operators-modal.component.html',
  styleUrls: ['./mobile-operators-modal.component.scss'],
})
export class MobileOperatorsModalComponent implements OnInit {
  @Input() transferType: string;

  operators: any;

  isChecked: boolean = false;
  constructor(private dialogRef: MatDialogRef<MobileOperatorsModalComponent>) {}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  select() {}
}

import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-schedule-payment',
  templateUrl: './schedule-payment.component.html',
  styleUrls: ['./schedule-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulePaymentComponent implements OnInit {

  constructor(
    readonly dialogRef: MatDialogRef<SchedulePaymentComponent>
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

}

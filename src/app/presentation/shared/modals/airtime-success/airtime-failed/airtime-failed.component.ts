import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { AirtimeFailedService } from 'src/app/core/services/airtime-failed/airtime-failed.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AirtimeFailedModal } from 'src/app/core/domain/airtime-failed.model';

@Component({
  selector: 'app-airtime-failed',
  templateUrl: './airtime-failed.component.html',
  styleUrls: ['./airtime-failed.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class AirtimeFailedComponent implements OnInit {

  constructor(
    private readonly airtimeFailedService: AirtimeFailedService,
    readonly dialogRef: MatDialogRef<AirtimeFailedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AirtimeFailedModal
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close(true);
  }

  closeModal(): void {
    this.airtimeFailedService.close();
  }

}

import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AirtimeFailedModal } from 'src/app/core/domain/airtime-failed.model';
import { AirtimeFailedComponent } from 'src/app/presentation/shared/modals/airtime-success/airtime-failed/airtime-failed.component';

@Injectable({
  providedIn: 'root'
})
export class AirtimeFailedService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open(data: AirtimeFailedModal) {
    this.dialogRef =  this.dialog.open<AirtimeFailedComponent, AirtimeFailedModal>(AirtimeFailedComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  }

  close() {
    this.dialogRef.close()
  }
}

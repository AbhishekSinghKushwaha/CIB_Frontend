import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BeneficiaryAddedComponent } from './../../../presentation/shared/modals/airtime-success/beneficiary-added/beneficiary-added.component';


@Injectable({
  providedIn: 'root'
})
export class BeneficiaryAddedService {

  dialogRef: any;

  constructor(private readonly dialog: MatDialog) { }

  open() {
    this.dialogRef =  this.dialog.open<BeneficiaryAddedComponent>(BeneficiaryAddedComponent, {
      disableClose: true,
    });
    return this.dialogRef;
  } 

  close() {
    this.dialogRef.close()
  }
}
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { AirtimeMobileNumberModel } from '../../domain/airtime-mobile-number.model';
import { AirtimeMobileNumberComponent } from './../../../presentation/shared/components/airtime-mobile-number/airtime-mobile-number.component';


@Injectable({
  providedIn: 'root'
})
export class AirtimeMobileNumberService {

  data = new Subject<AirtimeMobileNumberModel>();
  dialogRef: any;
  private defaultData: AirtimeMobileNumberModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: AirtimeMobileNumberModel | null) {
    this.dialogRef =  this.dialog.open<AirtimeMobileNumberComponent, AirtimeMobileNumberModel>(AirtimeMobileNumberComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  } 

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): AirtimeMobileNumberModel {
    return this.defaultData
  }

  close() {
    this.dialogRef.close()
  }
}

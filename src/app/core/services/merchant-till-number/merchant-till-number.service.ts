import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { merchantTillNumberModel } from '../../domain/merchant-till-number.model';
import { MerchantTillNumberComponent } from './../../../presentation/shared/modals/merchant-till-number/merchant-till-number.component';


@Injectable({
  providedIn: 'root'
})
export class MerchantTillNumberService {

  data = new Subject<merchantTillNumberModel>();
  dialogRef: any;
  private defaultData: merchantTillNumberModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: merchantTillNumberModel | null) {
    this.dialogRef =  this.dialog.open<MerchantTillNumberComponent, merchantTillNumberModel>(MerchantTillNumberComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  } 

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): merchantTillNumberModel {
    return this.defaultData
  }

  close() {
    this.dialogRef.close()
  }
}

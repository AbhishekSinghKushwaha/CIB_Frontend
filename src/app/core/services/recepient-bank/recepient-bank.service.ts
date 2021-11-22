import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { recipientBankDetailsModel } from '../../domain/recepient-bank-details.model';
import { RecepientBankModalComponent } from './../../../presentation/shared/modals/recepient-bank-modal/recepient-bank-modal.component';

@Injectable({
  providedIn: 'root'
})
export class RecepientBankService {

  data = new Subject<recipientBankDetailsModel>();
  dialogRef: any;
  private defaultData: recipientBankDetailsModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: recipientBankDetailsModel | null) {
    this.dialogRef =  this.dialog.open<RecepientBankModalComponent, recipientBankDetailsModel>(RecepientBankModalComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  } 

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): recipientBankDetailsModel {
    return this.defaultData
  }

  close() {
    this.dialogRef.close()
  }

}

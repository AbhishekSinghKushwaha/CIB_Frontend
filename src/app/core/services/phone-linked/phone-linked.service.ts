import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { phoneLinkedModel } from '../../domain/phone-linked.modal';
import { PhoneLinkedModalComponent } from './../../../presentation/shared/modals/phone-linked-modal/phone-linked-modal.component';

@Injectable({
  providedIn: 'root'
})
export class PhoneLinkedService { 

  data = new Subject<phoneLinkedModel>();
  dialogRef: any;
  private defaultData: phoneLinkedModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: phoneLinkedModel | null) {
    this.dialogRef =  this.dialog.open<PhoneLinkedModalComponent, phoneLinkedModel>(PhoneLinkedModalComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  } 

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): phoneLinkedModel {
    return this.defaultData
  }

  close() {
    this.dialogRef.close()
  }
}

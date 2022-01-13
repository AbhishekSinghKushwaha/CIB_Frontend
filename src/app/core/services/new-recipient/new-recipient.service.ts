import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { recipientModel } from '../../domain/recipient.model';
import { NewRecipientModalComponent } from './../../../presentation/shared/modals/new-recipient-modal/new-recipient-modal.component';

@Injectable()
export class NewRecipientService {
  data = new Subject<recipientModel>();
  dialogRef: any;
  private defaultData: recipientModel;

  constructor(private readonly dialog: MatDialog) { }

  open(data: recipientModel | null) {
    this.dialogRef =  this.dialog.open<NewRecipientModalComponent, recipientModel>(NewRecipientModalComponent, {
      disableClose: true,
      data
    });
    return this.dialogRef;
  }

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): recipientModel {
    return this.defaultData
  }

  close() {
    this.dialogRef.close()
  }

}

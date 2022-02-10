import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { recipientModel } from '../../domain/recipient.model';
import { NewRecipientModalComponent } from '../../../presentation/shared/modals/new-recipient-modal/new-recipient-modal.component';

@Injectable({
  providedIn: 'root'
})
export class NewRecipientService {
  data = new Subject<recipientModel>();
  dialogRef: any;
  private defaultData: recipientModel;

  constructor(private readonly dialog: MatDialog) { }

  // Open New Recipient Form Based on transaction type
  open(transactionType: string) {
    return this.dialog.open<NewRecipientModalComponent, any>(
      NewRecipientModalComponent,
      {
        maxWidth: '22vw',
        disableClose: true,
        data: transactionType,
      }
    );
  }

  // Opens the New Recipient Modal but instead of transaction Type we pass the mode of pesalink selected i.e bank or phone-linked
  openPesalinkNewRecipient(mode: string) {
    return this.dialog.open<NewRecipientModalComponent, any>(
      NewRecipientModalComponent,
      {
        maxWidth: '22vw',
        disableClose: true,
        data: mode,
      }
    );
  }

  set(input: any): void {
    this.defaultData = { ...this.defaultData, ...input };
    this.data.next(this.defaultData);
  }

  get default(): recipientModel {
    return this.defaultData;
  }
}
